import { useMutation } from '@tanstack/react-query'

import { register } from '@/shared/services/auth.service'
import { RegisterHttpParams } from '@/shared/interfaces/http/register'

export const useRegisterMutation = () => {
  const mutation = useMutation({
    mutationFn: (userData: RegisterHttpParams) => register(userData),
    onSuccess: (response) => {
      console.log(response)
    },
    onError: (error) => {
      console.log(error)
    },
  })

  return mutation
}
