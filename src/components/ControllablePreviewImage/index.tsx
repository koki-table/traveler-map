'use client'

import React, { useRef, useEffect, useCallback } from 'react'
import * as d3 from 'd3'
import { Button } from '../ui/button'
import {
  previewImageParametersType,
  usePrefectureContext,
} from '@/features/prefecture/contexts/PrefectureContext'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

interface NodeData {
  x: number
  y: number
  fx?: number | null
  fy?: number | null
}

const ControllablePreviewImage: React.FC<{
  imageUrl: string | ArrayBuffer | null
  prefecture: string
}> = ({ imageUrl, prefecture }) => {
  const router = useRouter()

  const svgRef = useRef<SVGSVGElement>(null)
  const imageParametersRef = useRef<previewImageParametersType>({
    x: 0,
    y: 0,
    width: 250,
    height: 250,
  })

  const { PrefectureAction, PrefectureState } = usePrefectureContext()

  useEffect(() => {
    if (!svgRef.current) return

    const svg = d3.select<SVGSVGElement, NodeData[]>(svgRef.current)

    // デフォルト表示の座標
    const nodesData: NodeData[] = [{ x: 200, y: 200 }]

    const previewImage = svg
      .selectAll<SVGImageElement, NodeData>('image')
      .data(nodesData)
      .call(
        d3
          .drag<SVGImageElement, NodeData>()
          .on('start', dragStarted)
          .on('drag', dragged)
          .on('end', dragEnded),
      )

    const simulation = d3.forceSimulation<NodeData>(nodesData)

    // tick 毎のレイアウト
    const ticHandler = () => {
      previewImage.attr('x', (d) => d.x).attr('y', (d) => d.y)
    }

    // Simulation オブジェクトにノード配列をセットして tick イベントをハンドル開始
    simulation.on('tick', () => ticHandler())

    function dragStarted(event: d3.D3DragEvent<SVGImageElement, NodeData, unknown>, d: NodeData) {
      if (!event.active) simulation.alphaTarget(0.3).restart()

      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: d3.D3DragEvent<SVGImageElement, NodeData, unknown>, d: NodeData) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragEnded(event: d3.D3DragEvent<SVGImageElement, NodeData, unknown>, d: NodeData) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null

      imageParametersRef.current.x = event.x
      imageParametersRef.current.y = event.y
    }

    return () => {
      simulation.stop()
    }
  }, [])

  type prefecture = {
    name: string
  }
  const mutation = useMutation({
    mutationFn: (prefectureName: prefecture) => {
      return axios.post('/api/prefecture', prefectureName)
    },
  })

  const onSubmit = useCallback(() => {
    mutation.mutate({ name: 'sample' })

    PrefectureAction.onConfirmImage(PrefectureState.previewImageUrl, imageParametersRef.current)
    router.push(`/${prefecture}`)
  }, [PrefectureAction, PrefectureState.previewImageUrl, mutation, prefecture, router])

  return (
    <>
      <svg width={500} height={500} ref={svgRef}>
        <image width='250px' height={'250px'} href={imageUrl ? String(imageUrl) : ''} />
      </svg>
      <Button onClick={onSubmit}>Salve</Button>
    </>
  )
}

export default ControllablePreviewImage
