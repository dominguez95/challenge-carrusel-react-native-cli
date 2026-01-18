import { jwtDecode } from 'jwt-decode';
// Decodes a JWT token and returns its payload
export const decodeToken = token => {
  if (!token) return null;
  return jwtDecode(token);
};
// Checks if the token is expired based on its 'exp' claim
export const isTokenExpired = expireDate => {
  const now = Date.now();
  if (typeof expireDate === 'string') {
    const expTime = new Date(expireDate).getTime();
    return expTime <= now;
  }
  if (typeof expireDate === 'number') {
    const expTime = expireDate * 1000;
    return expTime <= now;
  }
  return true;
};
