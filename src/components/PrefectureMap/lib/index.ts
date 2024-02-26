import { FeatureCollection } from 'geojson'

/**
 * 引数で指定した県のgeoJsonを取得
 */
export const getPrefectureJson = (geojson: FeatureCollection, prefecture?: string) => {
  const prefectureJson = geojson.features.filter(
    (item) => item.properties?.name === prefecture && item.geometry != null,
  )

  return prefectureJson
}
