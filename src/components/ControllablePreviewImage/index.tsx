'use client'

import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'

interface NodeData {
  x: number
  y: number
  fx?: number | null
  fy?: number | null
}

const ControllablePreviewImage: React.FC<{
  imageUrl: string | ArrayBuffer | null
}> = ({ imageUrl }) => {
  // const svgRef = useRef({ x: 30, y: 50, fx: null, fy: null })
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select<SVGSVGElement, NodeData[]>(svgRef.current)

    const nodesData: NodeData[] = [
      // { x: 0, y: 0 },
      // { x: 100, y: 100 },
      { x: 200, y: 200 },
      // { x: 300, y: 300 },
    ]

    const previewImage = svg
      .selectAll<SVGImageElement, NodeData>('image')
      .data(nodesData)
      // .enter()
      // .append('image')
      // // .attr('href', imageUrl ? String(imageUrl) : null)
      // .attr('href', 'sample.jpg')
      // .attr('height', 100)
      // .attr('width', 100)
      .call(
        d3
          .drag<SVGImageElement, NodeData>()
          .on('start', dragStarted)
          .on('drag', dragged)
          .on('end', dragEnded),
      )

    const simulation = d3.forceSimulation<NodeData>(nodesData)

    function dragStarted(event: d3.D3DragEvent<SVGImageElement, NodeData, unknown>, d: NodeData) {
      console.log('ddd')

      console.log(event)

      console.log(d)
      if (!event.active) simulation.alphaTarget(0.3).restart()

      d.fx = d.x
      d.fy = d.y

      // svgRef.current.x = d.fx
      // svgRef.current.y = d.fy
    }

    function dragged(event: d3.D3DragEvent<SVGImageElement, NodeData, unknown>, d: NodeData) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragEnded(event: d3.D3DragEvent<SVGImageElement, NodeData, unknown>, d: NodeData) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    simulation.on('tick', () => {
      previewImage.attr('x', (d) => d.x).attr('y', (d) => d.y)
    })

    return () => {
      simulation.stop()
    }
  }, [])

  // console.log(svgRef.current.x );

  return (
    <svg width={500} height={500} ref={svgRef}>
      <image width='100px' height={'100px'} href={'sample.jpg'} />
    </svg>
  )
}

export default ControllablePreviewImage
