import { Text, TouchableOpacity, View } from 'react-native'

import { AppInputController } from '@/shared/components/AppInputController'
import { AuthFormHeader } from '@/shared/components/AuthFormHeader'

import { useRegisterViewModel } from './useRegister.viewModel'

type Props = ReturnType<typeof useRegisterViewModel>

export function RegisterView({ onSubmit, control }: Props) {
  return (
    <View className="flex-1 items-center justify-center">
      <AuthFormHeader
        title="Crie sua conta"
        subtitle="Informe seus dados pessoais e de acesso"
      />

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
