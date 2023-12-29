import { validateToken } from './validation'
import auth from './auth'

type OverrideHeaders = { [key: string]: string }

type Override = {
  body?: unknown
  headers?: OverrideHeaders
}

type Options = {
  withAuth?: boolean,
  body?: unknown,
  override?: Override
}

type Fetcher = {
  method: 'POST' | 'GET' | 'DELETE' | 'PUT'
  route: string
  withAuth?: boolean
  body?: unknown
  override?: Override
}

type Response = {
  data: unknown | null
  error: string | null
}

const getHeaders = async (withAuth?: boolean, override?: OverrideHeaders) => {
  const headers = new Headers()

  if (!override) {
    headers.append('Content-Type', 'application/json')
  }

  if (withAuth) {
    let jwt = auth.getJWT()

    if (!jwt) {
      const refreshToken = localStorage.getItem('refresh-token')
      if (!refreshToken) throw Error('you have to sign in to do that')
    
      const { data, error } = await client.post('/token/refresh', {
        body: { refreshToken }
      })
    
      if (error) throw Error(error)
    
      const validatedData = validateToken(data)
      if (!validatedData) throw Error('malformed token')
    
      const { token } = validatedData
    
      auth.signIn(token)
      jwt = token
    }

    headers.append('Authorization', `Bearer ${jwt}`)
  }
  
  return headers
}

const fetcher = async ({
    method,
    route,
    body,
    withAuth,
    override
  }: Fetcher): Promise<Response> => {
  const _fetch = async () => fetch(import.meta.env.VITE_BACKEND_URL + route, {
    method: method,
    headers: await getHeaders(withAuth, override?.headers),
    body:
      override?.body instanceof FormData ? override.body
      : body ? JSON.stringify(body)
      : null
  })

  try {
    let response = await _fetch()
  
    if (!response.ok) {
      const { message } = await response.json()
  
      if (message === 'token expired') {
        localStorage.removeItem('jwt')
        response = await _fetch()
      } else {
        return { error: message, data: null }
      }
    }
  
    const data = await response.json()
    return { data, error: null }
  } catch (error) {
    console.log(error)
    if (error instanceof Error) {
      return { data: null, error: error.message }
    }
    return { data: null, error: 'something went terribly wrong' }
  }
}

const get = async (route: string, options?: Pick<Options, 'withAuth'>) => {
  return await fetcher({ method: 'GET', route, ...options })
}

const post = async (route: string, options?: Options) => {
  return await fetcher({ method: 'POST', route, ...options})
}

const deleteRequest = async (route: string, options?: Options) => {
  return await fetcher({ method: 'DELETE', route, ...options})
}

const client = {
  get,
  post,
  delete: deleteRequest
}

export { client }