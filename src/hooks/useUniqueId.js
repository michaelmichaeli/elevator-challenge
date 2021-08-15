import { useRef } from 'react'
import useInitialMount from './useInitialMount'

let GLOBAL_ID = 0

const useUniqueId = () => {
  const idRef = useRef('')
  const isInitialMount = useInitialMount()

  // generate the ID for the first render
  // and store in the ref to remain for
  // subsequent renders
  if (isInitialMount) {
    GLOBAL_ID += 1
    idRef.current = `id${GLOBAL_ID}`
  }

  return idRef.current
}

export default useUniqueId