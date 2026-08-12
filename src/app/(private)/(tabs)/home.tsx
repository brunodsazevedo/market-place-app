import { View, Text, TouchableOpacity } from 'react-native'

import { useUserStore } from '@/shared/store/user-store'

export default function Home() {
  const { logout } = useUserStore()

  return (
    <View className="flex-1 items-center justify-center">
      <Text>home</Text>

      <TouchableOpacity onPress={logout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}
