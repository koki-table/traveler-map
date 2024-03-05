'use client'

import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

interface NodeData {
  x: number
  y: number
  fx?: number | null
  fy?: number | null
}

const D3DraggableSVG: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select<SVGSVGElement, NodeData[]>(svgRef.current)
    const width = +svg.attr('width')!
    const height = +svg.attr('height')!

    const nodesData: NodeData[] = [
      { x: 0, y: 0 },
      { x: 100, y: 100 },
      { x: 200, y: 200 },
      { x: 300, y: 300 },
    ]

    const circles = svg
      .selectAll<SVGCircleElement, NodeData>('circle')
      .data(nodesData)
      .join('circle')
      .attr('r', 30)
      .attr('fill', 'blue')
      .call(
        d3
          .drag<SVGCircleElement, NodeData>()
          .on('start', dragStarted)
          .on('drag', dragged)
          .on('end', dragEnded),
      )

    const simulation = d3
      .forceSimulation<NodeData>(nodesData)
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('charge', d3.forceManyBody().strength(1000))
      .force('collide', d3.forceCollide().radius(30))

    function dragStarted(event: d3.D3DragEvent<SVGCircleElement, NodeData, unknown>, d: NodeData) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: d3.D3DragEvent<SVGCircleElement, NodeData, unknown>, d: NodeData) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragEnded(event: d3.D3DragEvent<SVGCircleElement, NodeData, unknown>, d: NodeData) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    simulation.on('tick', () => {
      circles.attr('cx', (d) => d.x).attr('cy', (d) => d.y)
    })

    return () => {
      simulation.stop()
    }
  }, [])

  return (
    <svg ref={svgRef} width={500} height={500}>
      {/* Place any additional SVG elements or components here */}
    </svg>
  )
}

export default D3DraggableSVG
