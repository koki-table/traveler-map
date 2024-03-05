'use client'

import React, { useEffect, memo } from 'react'
import * as d3 from 'd3'
import geoJson from '@/lib/json/japan.json'
import { useMounted } from '@/lib/hooks/useMounted'
import { FeatureCollection } from 'geojson'
import { getPrefectureJson } from './lib'

const PrefectureMap = ({ prefecture, imageUrl }: { prefecture: string, imageUrl: string | ArrayBuffer | null}) => {
  const mounted = useMounted()

  console.log(imageUrl);
  

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

    // 地理データに基づいてクリッピングパスを定義
    svg
      .append('clipPath')
      .attr('id', 'map-clip')
      .selectAll(`path`)
      .data(prefectureJson)
      .enter()
      .append(`path`)
      .attr(`d`, path)

    // クリッピングされた要素用のグループを作成
    const mapGroup = svg.append('g').attr('clip-path', 'url(#map-clip)')

    // クリップされた領域内に地図を描画
    mapGroup
      .selectAll(`path`)
      .data(prefectureJson)
      .enter()
      .append(`path`)
      .attr(`d`, path)
      .attr(`stroke`, `#666`)
      .attr(`stroke-width`, 0.25)
      .attr(`fill`, color)

    // クリップされた地図上に画像を描画
    mapGroup
      .append('svg:image')
      .attr('x', 250)
      .attr('y', 50)
      .attr('width', 200)
      .attr('height', 204)
      .attr('xlink:href', 'sample.jpg')

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
