export async function fetchJson(url: URL, method?: string, body?: Object) {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  if (!response.ok)
    throw new Error(`Error fetching ${url}: ${response.statusText}`)
  return response.json()
}
