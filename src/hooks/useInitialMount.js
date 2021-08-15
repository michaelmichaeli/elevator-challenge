import { useRef, useEffect } from 'react'
const useInitialMount = () => {
    // refs exist across component re-renders, so
    // we can use it to store a value for the
    // subsequent renders. We're tracking if it's
    // the first render, which is initially `true`
    const isFirst = useRef(true)
  
    // the very first render, the ref will be
    // `true`. but we immediately set it to `false`
    // so that every render after will be `false`
    if (isFirst.current) {
      isFirst.current = false
  
      // return true the very first render
      return true
    }
  
    // return false every following render
    return false
}
  export default useInitialMount