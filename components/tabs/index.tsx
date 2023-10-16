import { CommonComponentProps } from '../common-component-props'
import styles from './styles.module.scss'

type TabsProps = {
  names: string[]
  activeIndex: number
  onActive: (index: number) => void
} & CommonComponentProps

export default function Tabs({
  names,
  activeIndex,
  onActive,
  style,
}: TabsProps) {
  const tabs = names.map((name, index) => (
    <span
      key={name}
      onClick={() => {
        if (index !== activeIndex) {
          onActive(index)
        }
      }}
      className={
        activeIndex === index
          ? `${styles.active} ${styles.tab}`
          : `${styles.tab}`
      }
    >
      {name}
    </span>
  ))
  return (
    <div className={styles.base} style={style}>
      {tabs}
    </div>
  )
}
