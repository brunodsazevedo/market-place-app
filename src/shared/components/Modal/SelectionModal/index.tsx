import { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import Ionicons from '@react-native-vector-icons/ionicons'
import clsx from 'clsx'

import { SelectionOptions, SelectionVariant } from '@/shared/hooks/useAppModal'
import { colors } from '@/styles/colors'

export interface SelectionModalProps {
  title: string
  message?: string
  options: SelectionOptions[]
}

export const SelectionModal: FC<SelectionModalProps> = ({
  options,
  title,
  message,
}) => {
  const getButtonClass = (variant: SelectionVariant) =>
    clsx(
      'w-full py-3 px-4 rounded-lg items-center flex-row justify-center mb-2',
      {
        'bg-danger': variant === 'danger',
        'bg-blue-dark': variant === 'secondary',
        'bg-purple-base': variant === 'primary',
      },
    )

  return (
    <View className="bg-white rounded-xl shadow-2xl w-[85%] mx-auto max-w-sm p-6">
      <View className="items-center">
        <Text className="text-lg font-bold text-gray-900 mb-3">{title}</Text>

        {message && (
          <Text className="text-base text-gray-600 mb-6 leading-6">
            {message}
          </Text>
        )}
      </View>

      <View className="gap-3">
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            className={getButtonClass(option.variant ?? 'primary')}
            onPress={option.onPress}
          >
            {option.icon && (
              <Ionicons name={option.icon} size={20} color={colors.white} />
            )}
            <Text className="font-semibold text-white ml-2">{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
