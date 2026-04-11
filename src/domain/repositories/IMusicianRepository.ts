import { Musician } from '../entities/Musician';

export interface IMusicianRepository {
  findAll(): Promise<Musician[]>;
  findById(id: number): Promise<Musician | null>;
  create(musician: Omit<Musician, 'id'>): Promise<Musician>;
  update(id: number, musician: Partial<Musician>): Promise<Musician>;
  delete(id: number): Promise<void>;
}
