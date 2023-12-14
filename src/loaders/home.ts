export const homeLoader = async () => {
  const response = await fetch(import.meta.env.VITE_BACKEND_URL + '/posts', {
    headers: {
      'Accepts': 'application/json'
    }
  })

  return await response.json()
}