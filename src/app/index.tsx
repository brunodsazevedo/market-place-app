import { Redirect } from 'expo-router'

export default function App() {
  const userData = {
    token: 'asdasdasdasd',
    name: 'Bruno Azevedo',
  }

  if (userData) {
    return <Redirect href="/(private)/home" />
  }

  return <Redirect href="/login" />
}
