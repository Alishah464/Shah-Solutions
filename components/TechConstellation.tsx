'use client'

import { useState } from 'react'

interface Node {
  label: string
  desc: string
  color: string
}

const NODES: Node[] = [
  { label: 'Next.js', desc: 'High-performance web applications', color: '#7C3AED' },
  { label: 'React', desc: 'Fast, modern user interfaces', color: '#2563EB' },
  { label: 'TypeScript', desc: 'Type-safe, reliable code', color: '#06B6D4' },
  { label: 'AI / LLM', desc: 'Agents, RAG, automation', color: '#DB2777' },
  { label: 'Python', desc: 'AI & backend systems', color: '#EA580C' },
  { label: 'SEO / GEO', desc: 'Search & AI-search visibility', color: '#9F67FF' },
  { label: 'Cloud', desc: 'AWS, Azure & GCP infrastructure', color: '#3B82F6' },
  { label: 'Flutter', desc: 'Cross-platform mobile apps', color: '#22D3EE' },
]

const SIZE = 440
const CENTER = SIZE / 2
const RADIUS = 170

function nodePosition(index: number, total: number) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  return {
    x: CENTER + Math.cos(angle) * RADIUS,
    y: CENTER + Math.sin(angle) * RADIUS,
  }
}

export default function TechConstellation() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div className="flex flex-col items-center">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="w-full max-w-[440px] h-auto"
        role="group"
        aria-label="Aiventra Labs technology stack — interactive diagram, tab through nodes for details"
      >
        {NODES.map((node, i) => {
          const pos = nodePosition(i, NODES.length)
          const isActive = active === i
          return (
            <line
              key={`line-${node.label}`}
              x1={CENTER}
              y1={CENTER}
              x2={pos.x}
              y2={pos.y}
              stroke={node.color}
              strokeWidth={isActive ? 2 : 1}
              opacity={isActive ? 0.8 : 0.25}
              style={{ transition: 'opacity 0.2s ease, stroke-width 0.2s ease' }}
            />
          )
        })}

        {/* Center hub */}
        <circle cx={CENTER} cy={CENTER} r={44} fill="rgba(124,58,237,0.15)" stroke="#7C3AED" strokeWidth={1.5} />
        <text
          x={CENTER}
          y={CENTER + 5}
          textAnchor="middle"
          className="font-display font-black"
          fontSize={15}
          fill="#ffffff"
        >
          AIVENTRA
        </text>

        {NODES.map((node, i) => {
          const pos = nodePosition(i, NODES.length)
          const isActive = active === i
          return (
            <g
              key={node.label}
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              onClick={() => setActive(isActive ? null : i)}
              tabIndex={0}
              role="button"
              aria-label={`${node.label}: ${node.desc}`}
            >
              <circle
                cx={pos.x}
                cy={pos.y}
                r={isActive ? 30 : 26}
                fill={isActive ? node.color : 'rgba(255,255,255,0.04)'}
                stroke={node.color}
                strokeWidth={1.5}
                style={{ transition: 'r 0.2s ease, fill 0.2s ease' }}
              />
              <text
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                fontSize={9}
                fontWeight={700}
                fill={isActive ? '#050510' : '#E2E8F0'}
                style={{ pointerEvents: 'none', transition: 'fill 0.2s ease' }}
              >
                {node.label.length > 10 ? node.label.slice(0, 9) + '…' : node.label}
              </text>
            </g>
          )
        })}
      </svg>

      <div className="h-10 mt-2 text-center">
        {active !== null && (
          <p className="text-slate-300 text-sm">
            <span className="font-semibold text-white">{NODES[active].label}</span>
            {' — '}
            {NODES[active].desc}
          </p>
        )}
        {active === null && (
          <p className="text-slate-400 text-sm">Hover or tap a node to see what it&apos;s for</p>
        )}
      </div>
    </div>
  )
}
