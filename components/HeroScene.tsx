'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useReducedMotion } from 'framer-motion'
import { isSoftwareRenderer } from '@/lib/webgl'

const NODE_COLORS = [0x7c3aed, 0x2563eb, 0x06b6d4]
// Roughly the AI / Software / Data satellites sketched in the brief —
// abstract nodes orbiting a core, not a literal robot or brand mascot.
const NODE_POSITIONS: [number, number, number][] = [
  [1.6, 0.9, 0.3],
  [-1.5, -0.6, 0.6],
  [0.2, -1.2, -0.8],
]

/** The interactive "digital intelligence core" for the hero's right column.
 * Raw Three.js — @react-three/fiber pulled in a broken copy of React's
 * internal reconciler ABI against this project's exact React/webpack setup
 * (crashed on `ReactCurrentOwner` on every mount), so this renders and
 * animates the scene imperatively instead, same pattern as
 * ShaderBackground. No React-Three coupling means no such conflict is
 * possible. Loaded via next/dynamic({ ssr: false }) by the parent and only
 * ever mounted on confirmed desktop viewports — see app/page.tsx. */
export default function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // WebGL isn't guaranteed — blocked by the browser, an old GPU driver, a
    // policy, etc. The 3D core is an enhancement on top of the hero's
    // shader background and copy, not a dependency, so on failure this just
    // leaves the container empty rather than crashing or logging noise.
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      return
    }
    const gl = renderer.getContext()
    if (!gl) {
      renderer.dispose()
      return
    }
    if (isSoftwareRenderer(gl)) {
      renderer.dispose()
      return
    }

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 4.5)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    container.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0xffffff, 0.6))
    const light1 = new THREE.PointLight(0x9f67ff, 1.2)
    light1.position.set(3, 3, 3)
    scene.add(light1)
    const light2 = new THREE.PointLight(0x06b6d4, 0.8)
    light2.position.set(-3, -2, -2)
    scene.add(light2)

    const group = new THREE.Group()
    scene.add(group)

    const wireframeCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.MeshStandardMaterial({
        color: 0x7c3aed,
        emissive: 0x5b21b6,
        emissiveIntensity: 0.6,
        roughness: 0.25,
        metalness: 0.4,
        wireframe: true,
      })
    )
    group.add(wireframeCore)

    const solidCore = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.55, 0),
      new THREE.MeshStandardMaterial({ color: 0x9f67ff, emissive: 0x7c3aed, emissiveIntensity: 1.1, roughness: 0.15 })
    )
    group.add(solidCore)

    NODE_POSITIONS.forEach((pos, i) => {
      const color = NODE_COLORS[i]
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.14, 16, 16),
        new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: 1.2 })
      )
      node.position.set(...pos)
      group.add(node)

      const lineGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(...pos),
      ])
      const line = new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 }))
      group.add(line)
    })

    function resize() {
      const rect = container!.getBoundingClientRect()
      const scale = Math.min(rect.width, rect.height) / 420
      group.scale.setScalar(scale)
      camera.aspect = rect.width / rect.height
      camera.updateProjectionMatrix()
      renderer.setSize(rect.width, rect.height)
    }
    resize()
    window.addEventListener('resize', resize)

    let target = { x: 0, y: 0 }
    const handlePointerMove = (e: PointerEvent) => {
      target = { x: (e.clientX / window.innerWidth) * 2 - 1, y: (e.clientY / window.innerHeight) * 2 - 1 }
    }
    if (!prefersReducedMotion) window.addEventListener('pointermove', handlePointerMove)

    let visible = !document.hidden
    const handleVisibility = () => { visible = !document.hidden }
    document.addEventListener('visibilitychange', handleVisibility)

    let raf = 0
    let last = performance.now()
    const FRAME_INTERVAL = 1000 / 30
    if (prefersReducedMotion) {
      group.rotation.set(0.2, 0.6, 0)
    }

    function animate(now: number) {
      raf = requestAnimationFrame(animate)
      const elapsed = now - last
      if (elapsed < FRAME_INTERVAL) return
      const delta = Math.min(elapsed / 1000, 0.1)
      last = now - (elapsed % FRAME_INTERVAL)
      if (visible) {
        if (!prefersReducedMotion) {
          group.rotation.y += delta * 0.15
          group.rotation.x += (target.y * 0.3 - group.rotation.x) * Math.min(delta * 2, 1)
          group.rotation.z += (target.x * -0.15 - group.rotation.z) * Math.min(delta * 2, 1)
        }
        renderer.render(scene, camera)
      }
    }
    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('visibilitychange', handleVisibility)
      container!.removeChild(renderer.domElement)
      renderer.dispose()
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh || obj instanceof THREE.Line) {
          obj.geometry.dispose()
          const material = obj.material
          if (Array.isArray(material)) material.forEach((m) => m.dispose())
          else material.dispose()
        }
      })
    }
  }, [prefersReducedMotion])

  return <div ref={containerRef} className="w-full h-full" data-testid="hero-scene" />
}
