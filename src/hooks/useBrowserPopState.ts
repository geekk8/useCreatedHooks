import { useEffect, useState } from 'react'

const useBrowserPopState = () => {
  const [isBackButtonClicked, setIsBackButtonClicked] = useState(false)

  useEffect(() => {
    const handlePopState = () => {
      setIsBackButtonClicked(true)
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return isBackButtonClicked
}

export default useBrowserPopState