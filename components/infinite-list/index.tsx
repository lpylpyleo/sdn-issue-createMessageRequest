import React, { useEffect, useRef, useState } from 'react'
import { CommonComponentProps } from '../common-component-props'
import styles from './styles.module.scss'
import { CircularProgress } from '@mui/material'

function useIsVisible(ref: React.MutableRefObject<any>) {
  const [isIntersecting, setIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting),
    )

    observer.observe(ref.current)
    return () => {
      observer.disconnect()
    }
  }, [ref])

  return isIntersecting
}

type InfiniteListProps = {
  children: React.ReactNode
  page: number
  hasMore: boolean
  onLoadMore: (page: number) => void
} & CommonComponentProps

export default function InfiniteList({
  style,
  children,
  page,
  hasMore,
  onLoadMore,
}: InfiniteListProps) {
  const loadingRef = useRef(null)
  const isLoadingVisible = useIsVisible(loadingRef)

  useEffect(() => {
    if (hasMore && isLoadingVisible) {
      onLoadMore(page + 1)
    }
  }, [isLoadingVisible, hasMore])

  return (
    <div className={styles.base} style={style}>
      {children}
      <CircularProgress
        disableShrink
        style={{ display: hasMore ? 'block' : 'none', margin: '10px auto' }}
        ref={loadingRef}
      />
    </div>
  )
}
