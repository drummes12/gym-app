const JSON_CONTENT_TYPE = 'application/json'
const DEFAULT_HEADERS = {
  'Content-Type': JSON_CONTENT_TYPE
}

export function sanitizeString(str: any | null) {
  if (typeof str !== 'string') return str
  return str
    .toString()
    .replaceAll(/[^a-zA-Z0-9]/g, '')
    .toLowerCase()
}

export function createResponse(
  body: any,
  status = 200,
  headers: HeadersInit = DEFAULT_HEADERS
) {
  return new Response(JSON.stringify(body), {
    status,
    headers
  })
}

export function createIdFromString(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim()
    .replace(/\s+/g, '_')
}
