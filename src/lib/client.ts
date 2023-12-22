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
      jwt = await auth.refreshJWTToken()
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
}

const get = async (route: string, options?: Pick<Options, 'withAuth'>) => {
  return await fetcher({ method: 'GET', route, ...options })
}

const post = async (route: string, options?: Options) => {
  return await fetcher({ method: 'POST', route, ...options})
}

const client = {
  get,
  post
}

export { client }