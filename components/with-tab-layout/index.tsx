import React from 'react'
import styles from './styles.module.scss'
import { CommonComponentProps } from '../common-component-props'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

type WithTabLayoutProps = {
  children: React.ReactNode
} & CommonComponentProps

const tabDefs = [
  {
    href: '/home',
    activeSrc: '/dapp/images/home-active.webp',
    inactiveSrc: '/dapp/images/home-inactive.webp',
  },
  {
    href: '/rooms',
    activeSrc: '/dapp/images/rooms-active.webp',
    inactiveSrc: '/dapp/images/rooms-inactive.webp',
  },
  {
    href: '/search',
    activeSrc: '/dapp/images/search-active.webp',
    inactiveSrc: '/dapp/images/search-inactive.webp',
  },
  {
    href: '/my',
    activeSrc: '/dapp/images/my-active.webp',
    inactiveSrc: '/dapp/images/my-inactive.webp',
    alt: 'home',
  },
]

const tabs = (pathname: string) =>
  tabDefs.map((tab) => (
    <Link href={tab.href} key={tab.href}>
      <Image
        src={pathname.startsWith(tab.href) ? tab.activeSrc : tab.inactiveSrc}
        alt={tab.href.slice(1)}
        width={28}
        height={28}
      />
    </Link>
  ))

export default function WithTabLayout({
  children,
  className,
}: WithTabLayoutProps) {
  const pathname = usePathname()
  return (
    <div className={`${styles.base} ${className || ''}`}>
      <div className={styles.page}>{children}</div>
      <div className={styles.tabs}>{tabs(pathname)}</div>
    </div>
  )
}
