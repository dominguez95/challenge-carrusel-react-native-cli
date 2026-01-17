import { api } from '../../core/api/axiosClient';
import { CarruselRepository } from '../../domain/repositories/carrusels';

export class CarruselRepositoryImpl extends CarruselRepository {
  async getCarrusels() {
    const response = await api.get('/mobile/data');
    return response.data;
  }
}
