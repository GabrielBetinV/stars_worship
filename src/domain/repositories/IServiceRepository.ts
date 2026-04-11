import { Service, ServiceWithDetails } from '../entities/Service';

export interface IServiceRepository {
  findAll(): Promise<ServiceWithDetails[]>;
  findById(id: number): Promise<ServiceWithDetails | null>;
  create(date: Date): Promise<Service>;
  assignMusician(serviceId: number, musicianId: number): Promise<void>;
  assignSong(serviceId: number, songId: number): Promise<void>;
  delete(id: number): Promise<void>;
}
