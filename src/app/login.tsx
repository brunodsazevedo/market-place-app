import { LoginView } from '@/viewModels/Login/login.view'
import { useLoginViewModel } from '@/viewModels/Login/useLoginViewModel'

export default function Login() {
  const props = useLoginViewModel()

  return <LoginView {...props} />
}
