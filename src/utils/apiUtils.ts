export function appendSlash(url: string) {
  return url.endsWith("/") ? url : `${url}/`
}
