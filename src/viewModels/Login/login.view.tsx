import { AppInput } from '@/shared/components/AppInput'
import { AuthFormHeader } from '@/shared/components/AuthFormHeader'
import { router } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

export const LoginView = () => {
  return (
    <View className="items-center justify-center flex-1">
      <AuthFormHeader
        title="Acesse sua conta"
        subtitle="Informe seu e-mail e senha para entrar"
      />

      <AppInput />

      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text>Registro</Text>
      </TouchableOpacity>
    </View>
  )
}
