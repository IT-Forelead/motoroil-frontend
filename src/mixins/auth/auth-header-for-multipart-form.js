export default function authHeaderForMultipart() {
  let token = sessionStorage.getItem('Authorization')
  if (token) {
    return 'Bearer ' + token
  } else {
    return {}
  }
}
