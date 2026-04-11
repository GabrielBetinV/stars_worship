import { IServiceRepository } from '@/domain/repositories/IServiceRepository';
import { ServiceWithDetails } from '@/domain/entities/Service';

export class SchedulingUseCases {
  constructor(private serviceRepo: IServiceRepository) {}

  async getUpcomingServices(): Promise<ServiceWithDetails[]> {
    return this.serviceRepo.findAll();
  }

  async createService(date: Date, musicianIds: number[], songIds: number[]): Promise<void> {
    const service = await this.serviceRepo.create(date);
    
    for (const mId of musicianIds) {
      await this.serviceRepo.assignMusician(service.id, mId);
    }

    for (const sId of songIds) {
      await this.serviceRepo.assignSong(service.id, sId);
    }
  }

  async deleteService(id: number): Promise<void> {
    return this.serviceRepo.delete(id);
  }
}
