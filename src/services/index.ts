import * as workouts from './workouts'
import * as exercises from './exercises'
import * as zones from './zones'

export async function fetchJson(
  url: URL | string,
  method?: string,
  body?: Object
) {
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

export { workouts, exercises, zones }
