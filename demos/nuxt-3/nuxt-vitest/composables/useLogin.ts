export function useLogin() {
  const email = ref('')
  const password = ref('')

  const login = async () => {}

  return {
    email,
    password,
    login
  }
}
