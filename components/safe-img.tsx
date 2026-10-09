'use client'

import { type ImgHTMLAttributes, useEffect, useRef, useState } from 'react'

/** An <img> that removes itself if the source fails, letting the branded backdrop behind it show. */
export function SafeImg(props: ImgHTMLAttributes<HTMLImageElement>) {
  const ref = useRef<HTMLImageElement>(null)
  const [failed, setFailed] = useState(false)

  // The error can fire before hydration attaches onError, so check once on mount too.
  useEffect(() => {
    const img = ref.current
    if (img?.complete && img.naturalWidth === 0) setFailed(true)
  }, [])

  if (failed) return null
  return <img ref={ref} {...props} onError={() => setFailed(true)} />
}
