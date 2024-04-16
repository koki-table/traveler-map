'use client'

import React, { useEffect, memo } from 'react'
import * as d3 from 'd3'
import geoJson from '@/lib/json/japan.json'
import { useMounted } from '@/lib/hooks/useMounted'
import { useRouter } from 'next/navigation'

type List = {
  name: string
  count: number
}

const getTarget = ({ prefName, list }: { prefName: string; list: List[] }): List | null => {
  const pref = prefName.toLowerCase()
  let target: List | null = null
  list.map((e: any) => {
    if (e.name === pref) target = e
  })
  return target
}

const JapanMap = ({ list }: { list: List[] }) => {
  const router = useRouter()
  const mounted = useMounted()

  useEffect(() => {
    ;(async () => {
      function main() {
        const width = 500 // 描画サイズ: 幅
        const height = 500 // 描画サイズ: 高さ
        const centerPos: [number, number] = [137.0, 38.2] // 地図のセンター位置
        const scale = 1000 // 地図のスケール
        const color = '#2566CC' // 地図の色
        const colorActive = '#ebfd2a' // ホバーした時の色

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
          .data(geoJson.features)
          .enter()
          .append(`path`)
          .attr(`d`, path as any)
          .attr(`stroke`, `#666`)
          .attr(`stroke-width`, 0.25)
          .attr(`fill`, color)
          .attr(`cursor`, (item: any) => {
            // カーソルの設定
            const t = getTarget({ list, prefName: item.properties.name })
            if (!t || t.count === 0) return 'not-allowed'
            return 'pointer'
          })
          .attr(`fill-opacity`, (item: any) => {
            // 透明度の設定
            const t = getTarget({ list, prefName: item.properties.name })
            if (!t || t.count === 0) return 0
            return t.count * 0.05
          })

          /**
           * 都道府県領域の click イベントハンドラ
           */
          .on(`click`, function (item: any, target: any) {
            router.push(`/${target.properties.name}/upload`)
          })

          /**
           * 都道府県領域の MouseOver イベントハンドラ
           */
          .on(`mouseover`, async function (item: any, target: any) {
            // ラベル用のグループ
            const group = svg.append(`g`).attr(`id`, `label-group`)

            const t = getTarget({ list, prefName: target.properties.name })
            const count = t ? t.count : 0
            // ラベルに表示する文字
            const label = `${target.properties.name_ja}(${count}人)`
            // 矩形を追加: テキストの枠
            const rectElement = group
              .append(`rect`)
              .attr(`id`, `label-rect`)
              .attr(`stroke`, `#666`)
              .attr(`stroke-width`, 0.5)
              .attr(`fill`, `#fff`)

            // テキストを追加
            const textElement = group.append(`text`).attr(`id`, `label-text`).text(label)

            // テキストのサイズから矩形のサイズを調整
            const padding = {
              x: 5,
              y: 0,
            }
            const textSize = textElement.node()!.getBBox()
            rectElement
              .attr(`x`, textSize.x - padding.x)
              .attr(`y`, textSize.y - padding.y)
              .attr(`width`, textSize.width + padding.x * 2)
              .attr(`height`, textSize.height + padding.y * 2)

            d3.select(this).attr(`fill`, colorActive)
            d3.select(this).attr(`stroke-width`, `1`)
          })

          /**
           * 都道府県領域の MouseMove イベントハンドラ
           */
          // .on('mousemove', function (item: any) {
          //   // テキストのサイズ情報を取得
          //   const textSize = svg.select('#label-text').node()!.getBBox()

          //   // マウス位置からラベルの位置を指定
          //   const labelPos = {
          //     x: item.offsetX - textSize.width,
          //     y: item.offsetY - textSize.height,
          //   }

          //   // ラベルの位置を移動
          //   svg.select('#label-group').attr(`transform`, `translate(${labelPos.x}, ${labelPos.y})`)
          // })

          /**
           * 都道府県領域の MouseOut イベントハンドラ
           */
          .on(`mouseout`, function (item: any) {
            // ラベルグループを削除
            svg.select('#label-group').remove()
            d3.select(this).attr(`fill`, color)
            d3.select(this).attr(`stroke-width`, `0.25`)
          })
      }
      if (mounted) await main()
    })()
    return () => {
      const target = document.getElementById(`map-container`)
      if (target) target.innerHTML = ''
    }
  }, [list, mounted, router])

  return <div id='map-container' className='w-[500px] h-[500px]' />
}

export default memo(JapanMap)
