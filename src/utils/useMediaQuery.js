import { useEffect, useState } from 'react'

function useMediaQuery(query) {
  const [matches, setMatches] = useState(window.innerWidth > 1280)
  const matchQueryList = window.matchMedia(query)
  useEffect(() => {
    function handleChange(e) {
      setMatches(e.matches)
    }
    matchQueryList.addEventListener('change', handleChange)
    return () => {
      matchQueryList.removeEventListener('change', handleChange)
    }
  }, [query, matches])

  return matches
}

export default useMediaQuery
