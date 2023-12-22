const signIn = (jwt: string, refreshToken?: string, userId?: string) => {
  localStorage.setItem('jwt', jwt)
  if (refreshToken) localStorage.setItem('refresh-token', refreshToken)
  if (userId) localStorage.setItem('user-id', userId)
}

const signOut = () => {
  localStorage.clear()
}

const isSignedIn = () => {
  return !!localStorage.getItem('jwt')
}

const getJWT = () => {
  return localStorage.getItem('jwt')
}

const getUser = () => {
  return localStorage.getItem('user-id')
}

export default {
  signIn,
  signOut,
  isSignedIn,
  getJWT,
  getUser,
}