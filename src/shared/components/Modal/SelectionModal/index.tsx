import { Text, TouchableOpacity, View } from 'react-native'

import { SelectionOptions } from '@/shared/hooks/useAppModal'
import { FC } from 'react'
import Ionicons from '@react-native-vector-icons/ionicons'

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
  return (
    <View className="bg-white rounded-xl shadow-2xl w-[85%] mx-auto max-w-sm p-6">
      <Text>{title}</Text>

      {message && <Text>{message}</Text>}

      <View>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            className="w-full py-3 px-4 rounded-lg items-center flex-row justify-center mb-2"
            onPress={option.onPress}
          >
            {option.icon && <Ionicons name={option.icon} size={20} />}
            <Text>{option.text}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
