import jwtDecode from 'jwt-decode';
// Decodes a JWT token and returns its payload
export const decodeTonken = token => {
  if (!token) return null;
  return jwtDecode(token);
};
// Checks if the token is expired based on its 'exp' claim
export const isTokenExpired = exp => {
  // formmat date response:     "expireDate": "2021-09-20T17:21:18.265Z"
  const now = Date.now() / 1000;
  return exp < now;
};
