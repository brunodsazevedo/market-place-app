import { FC } from 'react'
import {
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native'
import { Ionicons, IoniconsIconName } from '@react-native-vector-icons/ionicons'

import { appInputVariants, AppInputVariantsProps } from './input.variants'
import { useAppInputViewModal } from './useAppInputViewModal'

export interface AppInputProps extends TextInputProps, AppInputVariantsProps {
  label?: string
  leftIcon?: IoniconsIconName
  rightIcon?: IoniconsIconName
  containerClassName?: string
  error?: string
  mask?: (value: string) => void | string
}

export const AppInput: FC<AppInputProps> = ({
  label,
  leftIcon,
  containerClassName,
  value,
  secureTextEntry = false,
  isDisabled,
  error,
  onBlur,
  onFocus,
  onChangeText,
  mask,
  ...textInputProps
}) => {
  const {
    getIconColor,
    handleBlur,
    handleFocus,
    handlePasswordToggle,
    showPassword,
    handleTextChange,
    isFocused,
  } = useAppInputViewModal({
    isError: !!error,
    onBlur,
    onFocus,
    mask,
    onChangeText,
    isDisabled,
    secureTextEntry,
    value,
  })

  const styles = appInputVariants({
    isFocused,
    isDisabled,
    isError: !!error,
  })

  return (
    <View className={styles.container({ className: containerClassName })}>
      <Text className={styles.label()}>{label}</Text>
      <Pressable className={styles.wrapper()}>
        {leftIcon && (
          <Ionicons
            name={leftIcon}
            color={getIconColor()}
            size={22}
            className="mr-3"
          />
        )}

        <TextInput
          value={value}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={styles.input()}
          onChangeText={handleTextChange}
          secureTextEntry={showPassword}
          {...textInputProps}
        />

        {secureTextEntry && (
          <TouchableOpacity activeOpacity={0.7} onPress={handlePasswordToggle}>
            <Ionicons
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              size={22}
            />
          </TouchableOpacity>
        )}
      </Pressable>

      {error && (
        <Text className={styles.error()}>
          <Ionicons name="alert-circle-outline" /> {error}
        </Text>
      )}
    </View>
  )
}
