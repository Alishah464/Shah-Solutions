/** Headless/CI Chrome (including Lighthouse and PageSpeed Insights, which run
 * in the same kind of sandboxed environment) commonly falls back to a
 * software WebGL renderer (SwiftShader, llvmpipe, etc.) when no real GPU is
 * available. Software-rasterizing a lit 3D scene or a per-pixel fragment
 * shader is dramatically more expensive than on real hardware and can block
 * the main thread for seconds — exactly the kind of cost these decorative
 * scenes are meant to avoid. Detecting it lets us skip the animation there
 * the same way we already skip it when WebGL is unavailable outright. */
export function isSoftwareRenderer(gl: WebGLRenderingContext | WebGL2RenderingContext): boolean {
  const info = gl.getExtension('WEBGL_debug_renderer_info')
  if (!info) return false
  const renderer = String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)).toLowerCase()
  return (
    renderer.includes('swiftshader') ||
    renderer.includes('llvmpipe') ||
    renderer.includes('software') ||
    renderer.includes('basic render')
  )
}
