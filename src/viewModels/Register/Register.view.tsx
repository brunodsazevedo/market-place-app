import { Text, TouchableOpacity, View } from 'react-native'
import { useRegisterViewModel } from './useRegister.viewModel'
import { AppInputController } from '@/components/AppInputController'

type Props = ReturnType<typeof useRegisterViewModel>

export function RegisterView({ onSubmit, control }: Props) {
  return (
    <View className="flex-1 items-center justify-center">
      <AppInputController
        control={control}
        name="email"
        leftIcon="mail-outline"
        label="E-MAIL"
      />

      <TouchableOpacity onPress={onSubmit}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  )
}
