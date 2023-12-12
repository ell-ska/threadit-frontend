const signIn = (jwt: string) => {
  localStorage.setItem('jwt', jwt)
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

export default {
  signIn,
  signOut,
  isSignedIn,
  getJWT
}