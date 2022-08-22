export default function authHeader() {
  let token = JSON.parse(sessionStorage.getItem('Authorization'));
  if (token) {
    return { Authorization: 'Bearer ' + token };
  } else {
    return {};
  }
}