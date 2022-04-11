export function appendSlash(url: string) {
  return url.endsWith("/") ? url : `${url}/`
}

export function isLoggedIn() {
  return !!localStorage.getItem("token")
}
