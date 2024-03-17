import { createContext, useContext, ReactNode, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

/**
 * state
 */
interface PrefectureContextState {
  isLoading: boolean
  previewImageUrl: string | ArrayBuffer | null
  definitionImageUrl: string | ArrayBuffer | null
}

const initialPrefectureContextState = (): PrefectureContextState => ({
  isLoading: true,
  previewImageUrl: null,
  definitionImageUrl: null,
})

/**
 * action
 */
export interface PrefectureContextAction {
  onPreviewSubmit: (e: string | ArrayBuffer | null, currentPrefecture: string) => void
}
export const initPrefectureContextAction = (): PrefectureContextAction => ({
  onPreviewSubmit: () => {},
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

  // state
  const [isLoading, setIsLoading] = useState<boolean>(defaultState?.isLoading)
  const [previewImageUrl, setPreviewImageUrl] = useState<string | ArrayBuffer | null>(null)
  const [definitionImageUrl, setDefinitionImageUrl] = useState<string | ArrayBuffer | null>(null)

  const onPreviewSubmit = useCallback((e: string | ArrayBuffer | null, currentPrefecture: string) => {
    setPreviewImageUrl(e)
    
    router.push(`/${currentPrefecture}/editor`)
  },[])

  /**
   * value
   */
  const value: PrefectureContextValues = {
    PrefectureState: {
      isLoading,
      previewImageUrl,
      definitionImageUrl,
    },
    PrefectureAction: {
      onPreviewSubmit,
    },
  }

  return <PrefectureContext.Provider value={value}>{children}</PrefectureContext.Provider>
}
