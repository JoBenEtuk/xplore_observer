import { useMemo } from 'react'

export default function useNav(data, slug) {
  const index = data.findIndex(data => data.id === slug)

  const nextUrl = useMemo(() => {
    if (index === 0) {
      return data[data.length - 1].tag === 'creative'
        ? `/case/creative/${data[data.length - 1].id}`
        : `/case/copy/${data[data.length - 1].id}`
    } else {
      return data[index - 1].tag === 'creative'
        ? `/case/creative/${data[index - 1].id}`
        : `/case/copy/${data[index - 1].id}`
    }
  }, [slug, data])

  const prevUrl = useMemo(() => {
    if (index + 1 === data.length) {
      return data[data.length - 1].tag === 'creative'
        ? `/case/creative/${data[0].id}`
        : `/case/copy/${data[0].id}`
    } else {
      return data[index + 1].tag === 'creative'
        ? `/case/creative/${data[index + 1].id}`
        : `/case/copy/${data[index + 1].id}`
    }
  }, [slug, data])
  return { nextUrl, prevUrl }
}
