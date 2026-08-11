import { Stack } from 'expo-router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ToastManager from 'toastify-react-native'

import { AppModal } from '@/shared/components/AppModal'

import '@/styles/global.css'

const queryClient = new QueryClient()

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(public)" />
        <Stack.Screen name="(private)" />
      </Stack>

      <AppModal />

      <ToastManager useModal={false} />
    </QueryClientProvider>
  )
}
