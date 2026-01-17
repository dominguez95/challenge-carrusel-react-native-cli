import { CarruselRepository } from '../../domain/repositories/carrusels';
import { api } from '../api/apiClient';

export class CarruselRepositoryImpl extends CarruselRepository {
  async getCarrusels() {
    const response = await api.get('/mobile/data');
    return response.data;
  }
}
