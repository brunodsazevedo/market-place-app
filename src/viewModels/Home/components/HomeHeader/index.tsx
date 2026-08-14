import { Image, Text, TouchableOpacity, View } from 'react-native'

import { useUserStore } from '@/shared/store/user-store'
import Ionicons from '@react-native-vector-icons/ionicons'
import { colors } from '@/styles/colors'

export const HomeHeader = () => {
  const { user } = useUserStore()

  return (
    <View>
      <TouchableOpacity className="flex-row items-center gap-6">
        <View className="relative">
          {user?.avatarUrl ? (
            <Image
              alt="User Avatar"
              source={{ uri: user?.avatarUrl }}
              className="w-[56px] h-[56px] rounded-xl border-shape"
            />
          ) : (
            <View className="w-[56px] h-[56px] rounded-xl items-center justify-center bg-shape border-2 border-gray-200">
              <Ionicons name="person" size={24} color={colors.gray[300]} />
            </View>
          )}
        </View>

        <View>
          <Text className="font-bold text-base">
            Olá, {user?.name.split(' ')[0] || 'Usuário'}
          </Text>

          <View className="flex-row items-center gap-2">
            <Text className="text-purple-base font-bold text-sm">
              Ver perfil
            </Text>

            <Ionicons
              size={20}
              name="arrow-forward-outline"
              color={colors['purple-base']}
            />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}
