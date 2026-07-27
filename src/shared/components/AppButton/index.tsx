import { FC } from 'react'
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'
import Ionicons, { IoniconsIconName } from '@react-native-vector-icons/ionicons'

import { colors } from '@/styles/colors'

import { ButtonVariants, buttonVariants } from './input.variants'

interface AppButtonProps extends TouchableOpacityProps, ButtonVariants {
  leftIcon?: IoniconsIconName
  rightIcon?: IoniconsIconName
  children: string
}

export const AppButton: FC<AppButtonProps> = ({
  leftIcon,
  rightIcon,
  children,
  variant = 'filled',
  isLoading,
  isDisabled,
  className,
  ...rest
}) => {
  const contentColor = variant === 'filled' ? 'white' : colors['purple-base']

  const styles = buttonVariants({
    hasIcon: !!leftIcon || !!rightIcon,
    isLoading,
    isDisabled,
    variant,
  })

  const renderContent = () => {
    if (isLoading) {
      return <ActivityIndicator size="small" color={contentColor} />
    }

    return (
      <>
        {leftIcon && <Ionicons name={leftIcon} color={contentColor} />}

        <Text className={styles.text()}>{children}</Text>

        {rightIcon && <Ionicons name={rightIcon} color={contentColor} />}
      </>
    )
  }

  return (
    <TouchableOpacity className={styles.base({ className })} {...rest}>
      {renderContent()}
    </TouchableOpacity>
  )
}
