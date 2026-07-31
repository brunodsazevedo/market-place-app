import { useCallback, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Toast } from 'toastify-react-native'

interface UseCameraOptions {
  aspect?: [number, number]
  quality?: number
  allowsEditing?: boolean
  exif?: boolean
}

export const useCamera = ({
  allowsEditing,
  aspect,
  exif,
  quality,
}: UseCameraOptions) => {
  const [isLoading, setIsLoading] = useState(false)

  const requestCameraPermission = useCallback(async (): Promise<boolean> => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync()

      const currentStatus = status === 'granted'

      if (!currentStatus) {
        Toast.error('Precisamos da sua permissão para acessar a câmera.', 'top')
      }

      return currentStatus
    } catch {
      Toast.error(
        'Erro ao solicitar permissão da câmera. Por favor, tente novamente.',
        'top',
      )

      return false
    }
  }, [])

  const openCamera = useCallback(async (): Promise<string | null> => {
    setIsLoading(true)

    try {
      const hasPermission = await requestCameraPermission()

      if (!hasPermission) return null

      const result = await ImagePicker.launchCameraAsync({
        aspect,
        quality,
        allowsEditing,
        exif,
      })

      if (!result.canceled && result.assets && result.assets.length > 0) {
        Toast.success('Imagem capturada com sucesso!', 'top')

        return result.assets[0].uri
      }

      return null
    } catch {
      Toast.error('Erro ao abrir a câmera. Por favor, tente novamente.', 'top')

      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { isLoading, openCamera, requestCameraPermission }
}
