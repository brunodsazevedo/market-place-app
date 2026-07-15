import { Text, TouchableOpacity, View } from 'react-native'
import { useRegisterViewModel } from './useRegister.viewModel'

type Props = ReturnType<typeof useRegisterViewModel>

export function RegisterView({ onSubmit }: Props) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>register</Text>

      <TouchableOpacity onPress={onSubmit}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  )
}
