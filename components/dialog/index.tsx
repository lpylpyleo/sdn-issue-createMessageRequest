import React from 'react'
import { CommonComponentProps } from '../common-component-props'
import { styled } from '@mui/material'
import MuiDialog from '@mui/material/Dialog'
import styles from './styles.module.scss'
import Image from 'next/image'

type DialogProps = {
  children: React.ReactNode
  open: boolean
  onClose: () => void
} & CommonComponentProps

const StyledDialog = styled(MuiDialog)({
  '&': {
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.6)',
    margin: '0',
  },

  '& .MuiPaper-root': {
    width: '100%',
    margin: '0 30px',
    position: 'relative',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    borderRadius: 'none',
  },
})

export default function Dialog({ children, open, onClose }: DialogProps) {
  return (
    <StyledDialog open={open}>
      <div className={styles.base}>
        <div className={styles.content}>{children}</div>
        <div className={styles.close}>
          <Image
            src="/dapp/icons/close.webp"
            alt="close button"
            width={20}
            height={20}
            onClick={onClose}
          />
        </div>
      </div>
    </StyledDialog>
  )
}
