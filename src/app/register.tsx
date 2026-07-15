import { RegisterView } from '@/viewModels/Register/Register.view'
import { useRegisterViewModel } from '@/viewModels/Register/useRegister.view'

export default function Register() {
  const props = useRegisterViewModel()

  return <RegisterView {...props} />
}
