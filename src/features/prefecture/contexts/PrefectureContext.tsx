import { createContext, useContext, ReactNode, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { PrismaClient } from '@prisma/client'

/**
 * state
 */
interface PrefectureContextState {
  isLoading: boolean
  previewImageUrl: string | ArrayBuffer | null
  definitionImageUrl: string | ArrayBuffer | null
  previewImageParameters: previewImageParametersType
}

export type previewImageParametersType = {
  x: number
  y: number
  width: number
  height: number
}

const initialPrefectureContextState = (): PrefectureContextState => ({
  isLoading: true,
  previewImageUrl: null,
  definitionImageUrl: null,
  previewImageParameters: {
    x: 0,
    y: 0,
    width: 250,
    height: 250,
  },
})

/**
 * action
 */
export interface PrefectureContextAction {
  onPreviewSubmit: (e: string | ArrayBuffer | null, currentPrefecture: string) => void
  onConfirmImage: (url: string | ArrayBuffer | null, parameters: previewImageParametersType) => void
}
export const initPrefectureContextAction = (): PrefectureContextAction => ({
  onPreviewSubmit: () => {},
  onConfirmImage: () => {},
})

/**
 * context
 */
export type PrefectureContextValues = {
  PrefectureState: PrefectureContextState
  PrefectureAction: PrefectureContextAction
}
const initialPrefectureContext = (): PrefectureContextValues => ({
  PrefectureState: initialPrefectureContextState(),
  PrefectureAction: initPrefectureContextAction(),
})

export const PrefectureContext = createContext<PrefectureContextValues>(initialPrefectureContext())
export const usePrefectureContext = () => useContext(PrefectureContext)

/**
 * provider
 */
export interface PrefectureProviderProps {
  children?: ReactNode
  defaultState?: PrefectureContextState
}

export const PrefectureContextProvider = ({
  children,
  defaultState = initialPrefectureContextState(),
}: PrefectureProviderProps) => {
  const router = useRouter()
  const prisma = new PrismaClient()

  // state
  const [isLoading, setIsLoading] = useState<boolean>(defaultState?.isLoading)
  const [previewImageUrl, setPreviewImageUrl] = useState<string | ArrayBuffer | null>(null)
  const [definitionImageUrl, setDefinitionImageUrl] = useState<string | ArrayBuffer | null>(null)
  const [previewImageParameters, setPreviewImageParameters] = useState<previewImageParametersType>({
    x: 0,
    y: 0,
    width: 250,
    height: 250,
  })

  const onPreviewSubmit = useCallback(
    (e: string | ArrayBuffer | null, currentPrefecture: string) => {
      setPreviewImageUrl(e)

      router.push(`/${currentPrefecture}/editor`)
    },
    [router],
  )

  const onConfirmImage = useCallback(
    (url: string | ArrayBuffer | null, parameters: previewImageParametersType) => {
      setDefinitionImageUrl(url)
      setPreviewImageParameters(parameters)
    },
    [],
  )

  /**
   * value
   */
  const value: PrefectureContextValues = {
    PrefectureState: {
      isLoading,
      previewImageUrl,
      definitionImageUrl,
      previewImageParameters,
    },
    PrefectureAction: {
      onPreviewSubmit,
      onConfirmImage,
    },
  }

  return <PrefectureContext.Provider value={value}>{children}</PrefectureContext.Provider>
}
