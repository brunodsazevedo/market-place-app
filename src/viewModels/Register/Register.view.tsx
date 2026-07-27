import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

import { AppInputController } from '@/shared/components/AppInputController'
import { AuthFormHeader } from '@/shared/components/AuthFormHeader'
import { KeyboardContainer } from '@/shared/components/KeyboardContainer'

import { useRegisterViewModel } from './useRegister.viewModel'

type Props = ReturnType<typeof useRegisterViewModel>

export function RegisterView({ onSubmit, control }: Props) {
  return (
    <KeyboardContainer>
      <ScrollView className="flex-1 px-[40px]">
        <AuthFormHeader
          title="Crie sua conta"
          subtitle="Informe seus dados pessoais e de acesso"
        />

        <AppInputController
          control={control}
          name="name"
          leftIcon="person-outline"
          label="NOME"
        />

        <AppInputController
          control={control}
          name="email"
          leftIcon="mail-outline"
          label="E-MAIL"
        />

        <AppInputController
          control={control}
          name="phone"
          leftIcon="call-outline"
          label="TELEFONE"
        />

        <AppInputController
          control={control}
          name="password"
          leftIcon="lock-closed-outline"
          label="SENHA"
          secureTextEntry
        />

        <AppInputController
          control={control}
          name="confirmPassword"
          leftIcon="lock-closed-outline"
          label="CONFIRMAR SENHA"
          secureTextEntry
        />

        <TouchableOpacity onPress={onSubmit}>
          <Text>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardContainer>
  )
}
