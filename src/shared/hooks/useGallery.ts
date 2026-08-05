import { useCallback, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { ImagePickerOptions } from 'expo-image-picker'
import { Toast } from 'toastify-react-native'
import { Alert, Linking } from 'react-native'

export const useGallery = (pickerOptions: ImagePickerOptions) => {
  const [isLoading, setIsLoading] = useState(false)

  const requestGalleryPermission = useCallback(async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()

      const currentStatus = status === 'granted'

      if (!currentStatus) {
        Alert.alert(
          'Permissão necessária',
          'Precisamos da sua permissão para acessar a galeria.',
          [
            {
              text: 'Cancelar',
              style: 'cancel',
            },
            {
              text: 'Abrir Configurações',
              onPress: () => {
                Linking.openSettings()
              },
            },
          ],
        )
      }

      return currentStatus
    } catch {
      Toast.error(
        'Erro ao solicitar permissão da galeria. Por favor, tente novamente.',
        'top',
      )

      return false
    }
  }, [])

  const openGallery = useCallback(async (): Promise<string | null> => {
    setIsLoading(true)

    try {
      const hasPermission = await requestGalleryPermission()

      if (!hasPermission) return null

      const result = await ImagePicker.launchImageLibraryAsync(pickerOptions)

      if (!result.canceled && result.assets && result.assets.length > 0) {
        Toast.success('Foto selecionada com sucesso!', 'top')

        return result.assets[0].uri
      }

      return null
    } catch {
      Toast.error(
        'Erro ao selecionar a foto da galeria. Por favor, tente novamente.',
        'top',
      )

      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { isLoading, openGallery, requestGalleryPermission }
}
