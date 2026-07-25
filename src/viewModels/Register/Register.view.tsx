import { Text, TouchableOpacity, View } from 'react-native'
import { useRegisterViewModel } from './useRegister.viewModel'
import { AppInput } from '@/components/AppInput'

type Props = ReturnType<typeof useRegisterViewModel>

export function RegisterView({ onSubmit }: Props) {
  return (
    <View className="flex-1 items-center justify-center">
      <AppInput leftIcon="mail-outline" label="E-mail" error="teste error" />
      <AppInput leftIcon="lock-closed-outline" label="Senha" secureTextEntry />

      <TouchableOpacity onPress={onSubmit}>
        <Text>Register</Text>
      </TouchableOpacity>
    </View>
  )
}
