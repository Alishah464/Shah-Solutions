'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { isSoftwareRenderer } from '@/lib/webgl'

// Raw WebGL rather than a 3D library — this is a single full-screen quad
// with a cheap fragment shader, kept to the hero only per the "3D/shader as
// a signature, not decoration everywhere" principle.
const VERTEX_SRC = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`

const FRAGMENT_SRC = `
precision mediump float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv * 2.0 - 1.0;
  float aspect = u_resolution.x / u_resolution.y;
  p.x *= aspect;

  vec2 mouse = (u_mouse / u_resolution.xy) * 2.0 - 1.0;
  mouse.x *= aspect;

  float t = u_time * 0.15;

  vec2 p1 = vec2(sin(t * 0.7) * 0.4, cos(t * 0.5) * 0.3) + mouse * 0.12;
  vec2 p2 = vec2(cos(t * 0.4) * 0.5, sin(t * 0.6) * 0.4);
  vec2 p3 = vec2(sin(t * 0.3 + 2.0) * 0.45, cos(t * 0.8 + 1.0) * 0.35);

  float d1 = length(p - p1);
  float d2 = length(p - p2);
  float d3 = length(p - p3);

  vec3 purple = vec3(0.486, 0.227, 0.929);
  vec3 blue   = vec3(0.145, 0.388, 0.922);
  vec3 cyan   = vec3(0.024, 0.714, 0.831);

  float g1 = smoothstep(0.9, 0.0, d1) * 0.5;
  float g2 = smoothstep(0.9, 0.0, d2) * 0.4;
  float g3 = smoothstep(0.9, 0.0, d3) * 0.4;

  vec3 color = purple * g1 + blue * g2 + cyan * g3;
  float alpha = clamp(g1 + g2 + g3, 0.0, 0.5);

  gl_FragColor = vec4(color * alpha, alpha);
}
`

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

/** Subtle animated gradient-blob field behind the hero. Renders an (empty
 * until drawn) canvas identically on server and client — the WebGL setup and
 * animation loop live entirely in a post-mount effect, so there's nothing
 * here that can diverge between SSR and hydration. */
export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true })
    if (!gl) return
    if (isSoftwareRenderer(gl)) return

    const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC)
    const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC)
    if (!vs || !fs) return
    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)
    const posLoc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const resLoc = gl.getUniformLocation(program, 'u_resolution')
    const timeLoc = gl.getUniformLocation(program, 'u_time')
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse')

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    // Soft, blurred blobs don't need a full-resolution buffer — rendering
    // smaller and letting the GPU upscale to the canvas's CSS size cuts
    // fragment-shader cost substantially with no visible quality loss.
    const RENDER_SCALE = 0.6
    let mouseX = 0
    let mouseY = 0

    function resize() {
      const rect = canvas!.getBoundingClientRect()
      canvas!.width = Math.max(1, Math.round(rect.width * dpr * RENDER_SCALE))
      canvas!.height = Math.max(1, Math.round(rect.height * dpr * RENDER_SCALE))
      gl!.viewport(0, 0, canvas!.width, canvas!.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect()
      mouseX = (e.clientX - rect.left) * dpr * RENDER_SCALE
      mouseY = (rect.height - (e.clientY - rect.top)) * dpr * RENDER_SCALE
    }
    window.addEventListener('mousemove', handleMouseMove)

    let visible = !document.hidden
    const handleVisibility = () => { visible = !document.hidden }
    document.addEventListener('visibilitychange', handleVisibility)

    let raf = 0
    let lastFrame = 0
    const FRAME_INTERVAL = 1000 / 30
    const start = performance.now()
    function render(now: number) {
      raf = requestAnimationFrame(render)
      if (now - lastFrame < FRAME_INTERVAL) return
      lastFrame = now
      if (visible) {
        gl!.uniform2f(resLoc, canvas!.width, canvas!.height)
        gl!.uniform1f(timeLoc, (performance.now() - start) / 1000)
        gl!.uniform2f(mouseLoc, mouseX, mouseY)
        gl!.clear(gl!.COLOR_BUFFER_BIT)
        gl!.drawArrays(gl!.TRIANGLES, 0, 6)
      }
    }
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('visibilitychange', handleVisibility)
      const lose = gl.getExtension('WEBGL_lose_context')
      lose?.loseContext()
    }
  }, [prefersReducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
      data-testid="shader-background"
    />
  )
}
