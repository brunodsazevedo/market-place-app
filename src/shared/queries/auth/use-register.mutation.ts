import { useMutation } from '@tanstack/react-query'

import { register } from '@/shared/services/auth.service'
import { RegisterHttpParams } from '@/shared/interfaces/http/register'
import { useUserStore } from '@/shared/store/user-store'
import { baseURL } from '@/shared/api/market-place-api'

export const useRegisterMutation = () => {
  const { setSession } = useUserStore()

  const mutation = useMutation({
    mutationFn: (userData: RegisterHttpParams) => register(userData),
    onSuccess: (response) => {
      const avatar = `${baseURL}/images/${response.user.avatar}`

      setSession({
        token: response.token,
        refreshToken: response.refreshToken,
        user: { ...response.user, avatar },
      })
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return mutation
}
