import { IoniconsIconName } from '@react-native-vector-icons/ionicons'

import { useModalStore } from '@/shared/store/modal-store'
import { createElement } from 'react'
import {
  SelectionModal,
  SelectionModalProps,
} from '../components/Modal/SelectionModal'

export interface SelectionOptions {
  text: string
  icon?: IoniconsIconName
  variant?: 'primary' | 'secondary' | 'danger'
  onPress: () => void
}

export const useAppModal = () => {
  const { open, close } = useModalStore()

  const showSelection = ({
    title,
    message,
    options,
  }: {
    title: string
    message?: string
    options: SelectionOptions[]
  }) => {
    open(
      createElement(SelectionModal, {
        options,
        title,
        message,
      } as SelectionModalProps),
    )
  }

  return { showSelection }
}
