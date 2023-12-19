import { client } from "./client"

const signIn = (jwt: string, refreshToken?: string) => {
  localStorage.setItem('jwt', jwt)
  if (refreshToken) localStorage.setItem('refresh-token', refreshToken)
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

const refreshJWTToken = async () => {
  const refreshToken = localStorage.getItem('refresh-token')

  if (!refreshToken) return { message: 'refresh token missing' }

  const { data, error } = await client.post('/token/refresh', {
    body: { refreshToken }
  })

  if (error) return error

  const { token } = data

  signIn(token)
  return token
}

export default {
  signIn,
  signOut,
  isSignedIn,
  getJWT,
  refreshJWTToken
}