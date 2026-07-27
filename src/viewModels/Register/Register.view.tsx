import { ScrollView, Text, View } from 'react-native'
import { router } from 'expo-router'

import { AppInputController } from '@/shared/components/AppInputController'
import { AuthFormHeader } from '@/shared/components/AuthFormHeader'
import { KeyboardContainer } from '@/shared/components/KeyboardContainer'
import { AppButton } from '@/shared/components/AppButton'

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
          placeholder="Seu nome completo"
        />

        <AppInputController
          control={control}
          name="phone"
          leftIcon="call-outline"
          label="TELEFONE"
          placeholder="(00) 00000-0000"
        />

        <Text className="text-base mt-6 font-bold text-gray-500">Acesso</Text>

        <AppInputController
          control={control}
          name="email"
          leftIcon="mail-outline"
          label="E-MAIL"
          placeholder="mail@exemple.com.br"
        />

        <AppInputController
          control={control}
          name="password"
          leftIcon="lock-closed-outline"
          label="SENHA"
          placeholder="Sua senha"
          secureTextEntry
        />

        <AppInputController
          control={control}
          name="confirmPassword"
          leftIcon="lock-closed-outline"
          label="CONFIRMAR SENHA"
          placeholder="Confirme a sua senha"
          secureTextEntry
        />

        <AppButton className="mt-6" onPress={onSubmit}>
          Registar
        </AppButton>

        <View className="mt-16">
          <Text className="text-base mb-6 text-gray-300">
            Já tem uma conta?
          </Text>

          <AppButton variant="outlined" onPress={() => router.push('/login')}>
            Login
          </AppButton>
        </View>
      </ScrollView>
    </KeyboardContainer>
  )
}
