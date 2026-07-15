import { Text, View } from 'react-native'
import { useRegisterViewModel } from './useRegister.view'

type Props = ReturnType<typeof useRegisterViewModel>

export function RegisterView(_props: Props) {
  return (
    <View className="flex-1 items-center justify-center">
      <Text>register</Text>
    </View>
  )
}
