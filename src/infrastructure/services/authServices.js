import { api } from '../../core/api/axiosClient';

export class AuthService {
  async getToken() {
    const response = await api.post('/mobile/auth', {
      sub: process.env.MI_CODIGO_ACCESO,
    });

    return response.data;
  }
}
