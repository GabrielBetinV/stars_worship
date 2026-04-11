import { ISongRepository } from '@/domain/repositories/ISongRepository';
import { Song } from '@/domain/entities/Song';

export class SongUseCases {
  constructor(private songRepo: ISongRepository) {}

  async getAllSongs(): Promise<Song[]> {
    return this.songRepo.findAll();
  }

  async createSong(name: string, key: string, youtubeUrl: string): Promise<Song> {
    return this.songRepo.create({ name, key, youtubeUrl });
  }

  async deleteSong(id: number): Promise<void> {
    return this.songRepo.delete(id);
  }
}
