import { IMusicianRepository } from '@/domain/repositories/IMusicianRepository';
import { Musician, MusicianStatus } from '@/domain/entities/Musician';

export class MusicianUseCases {
  constructor(private musicianRepo: IMusicianRepository) {}

  async getAllMusicians(): Promise<Musician[]> {
    return this.musicianRepo.findAll();
  }

  async createMusician(name: string, instrumentId: number): Promise<Musician> {
    return this.musicianRepo.create({ 
      name, 
      instrumentId, 
      status: MusicianStatus.ACTIVE 
    });
  }

  async toggleStatus(id: number): Promise<Musician> {
    const musician = await this.musicianRepo.findById(id);
    if (!musician) throw new Error('Musician not found');
    
    const newStatus = musician.status === MusicianStatus.ACTIVE 
      ? MusicianStatus.INACTIVE 
      : MusicianStatus.ACTIVE;
      
    return this.musicianRepo.update(id, { status: newStatus });
  }

  async deleteMusician(id: number): Promise<void> {
    return this.musicianRepo.delete(id);
  }
}
