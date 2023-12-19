import auth from './auth'

type Fetcher = {
  method: 'POST' | 'GET' | 'DELETE' | 'PUT'
  route: string
  withAuth?: boolean
  body?: unknown
}

type Response = {
  data: any | null
  error: string | null
}

const getHeaders = async (withAuth?: boolean) => {
  const headers = new Headers({
    'Content-Type': 'application/json',
  })

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
    withAuth
  }: Fetcher): Promise<Response> => {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + route, {
    method: method,
    headers: await getHeaders(withAuth),
    body: method === 'POST' ? JSON.stringify(body) : null
  })

  if (!response.ok) {
    const { message } = await response.json()
    return { error: message, data: null }
  }

  const data = await response.json()

  return { data, error: null }
}

const get = async (route: string, options: { withAuth?: boolean }) => {
  return await fetcher({ method: 'GET', route, ...options })
}

const post = async (route: string, options: { withAuth?: boolean, body?: unknown }) => {
  return await fetcher({ method: 'POST', route, ...options})
}

const client = {
  get,
  post
}

export { client }