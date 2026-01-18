import { decodeToken, isTokenExpired } from '../jwt';

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(token => {
    if (token === 'valid-token') {
      return { expireDate: '2030-01-01T00:00:00Z' };
    }
    if (token === 'expired-token') {
      return { expireDate: '2020-01-01T00:00:00Z' };
    }
    throw new Error('Invalid token');
  }),
}));

describe('jwt utils', () => {
  describe('decodeToken', () => {
    it('debería retornar null si no hay token', () => {
      expect(decodeToken(null)).toBeNull();
      expect(decodeToken(undefined)).toBeNull();
    });

    it('debería decodificar un token válido', () => {
      const result = decodeToken('valid-token');
      expect(result).toHaveProperty('expireDate');
    });
  });

  describe('isTokenExpired', () => {
    it('debería retornar true si la fecha ya pasó (string)', () => {
      const pastDate = '2020-01-01T00:00:00Z';
      expect(isTokenExpired(pastDate)).toBe(true);
    });

    it('debería retornar false si la fecha es futura (string)', () => {
      const futureDate = '2030-01-01T00:00:00Z';
      expect(isTokenExpired(futureDate)).toBe(false);
    });

    it('debería retornar true para valores inválidos', () => {
      expect(isTokenExpired(null)).toBe(true);
      expect(isTokenExpired(undefined)).toBe(true);
    });
  });
});
