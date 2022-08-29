export default function authHeader() {
  let token = sessionStorage.getItem('Authorization');
  if (token) {
    return { Authorization: 'Bearer ' + token };
  } else {
    return {};
  }
}