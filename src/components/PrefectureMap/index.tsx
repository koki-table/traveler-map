'use client'

import React, { useEffect, memo } from 'react'
import * as d3 from 'd3'
import geoJson from '@/lib/json/japan.json'
import { useMounted } from '@/lib/hooks/useMounted'
import { FeatureCollection } from 'geojson'
import { getPrefectureJson } from './lib'

const PrefectureMap = ({ prefecture }: { prefecture: string }) => {
  const mounted = useMounted()

  async function main() {
    const width = 500 // 描画サイズ: 幅
    const height = 500 // 描画サイズ: 高さ
    const centerPos: [number, number] = [137.0, 38.2] // 地図のセンター位置
    const scale = 1000 // 地図のスケール
    const color = '#2566CC' // 地図の色

    const prefectureJson = getPrefectureJson(geoJson as FeatureCollection, prefecture)

    // 地図設定
    const projection = d3
      .geoMercator()
      .center(centerPos)
      .translate([width / 2, height / 2])
      .scale(scale)

    // 地図をpathに投影(変換)
    const path = d3.geoPath().projection(projection)

    // SVG要素を追加
    const svg = d3
      .select(`#map-container`)
      .append(`svg`)
      .attr(`viewBox`, `0 0 ${width} ${height}`)
      .attr(`width`, `100%`)
      .attr(`height`, `100%`)

    // 都道府県の領域データをpathで描画
    svg
      .selectAll(`path`)
      .data(prefectureJson)
      .enter()
      .append(`path`)
      .attr(`d`, path as any)
      .attr(`stroke`, `#666`)
      .attr(`stroke-width`, 0.25)
      .attr(`fill`, color)

      /**
       * 都道府県領域の click イベントハンドラ
       */
      .on(`click`, function (item: any, target: any) {
        // クリックイベントを追加したい場合はこちらに記述
      })
  }

  useEffect(() => {
    ;(async () => {
      if (mounted) await main()
    })()
    return () => {
      const target = document.getElementById(`map-container`)
      if (target) target.innerHTML = ''
    }
  }, [mounted])

  return <div id='map-container' className='w-[500px] h-[500px]' />
}

export default memo(PrefectureMap)
