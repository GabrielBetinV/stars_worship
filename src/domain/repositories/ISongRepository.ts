import { Song } from '../entities/Song';

export interface ISongRepository {
  findAll(): Promise<Song[]>;
  findById(id: number): Promise<Song | null>;
  create(song: Omit<Song, 'id'>): Promise<Song>;
  update(id: number, song: Partial<Song>): Promise<Song>;
  delete(id: number): Promise<void>;
}
