import Image from 'next/image'
import { CommonComponentProps } from '../common-component-props'
import styles from './styles.module.scss'
import { AccountApi } from '@/lib/api'

type BalanceProps = {} & CommonComponentProps

export default function Balance(props: BalanceProps) {
  const balance = AccountApi.useBalance()
  return (
    <div
      className={`${styles.base} ${props.className || ''}`}
      style={props.style}
    >
      <div className={styles.coin}>
        <Image src="/dapp/images/bnb.webp" alt="bnb" width={18} height={18} />
        <span className={styles.coin__price}>{balance.bnb}</span>
      </div>
      <div className={styles.coin}>
        <Image src="/dapp/images/rcm.webp" alt="bnb" width={18} height={18} />
        <span className={styles.coin__price}>{balance.rcm}</span>
      </div>
    </div>
  )
}
