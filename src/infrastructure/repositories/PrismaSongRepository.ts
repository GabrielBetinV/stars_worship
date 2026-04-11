import { ISongRepository } from '@/domain/repositories/ISongRepository';
import { Song } from '@/domain/entities/Song';
import prisma from '../db/prisma';

export class PrismaSongRepository implements ISongRepository {
  async findAll(): Promise<Song[]> {
    return prisma.song.findMany();
  }

  async findById(id: number): Promise<Song | null> {
    return prisma.song.findUnique({ where: { id } });
  }

  async create(song: Omit<Song, 'id'>): Promise<Song> {
    return prisma.song.create({ data: song });
  }

  async update(id: number, song: Partial<Song>): Promise<Song> {
    return prisma.song.update({ where: { id }, data: song });
  }

  async delete(id: number): Promise<void> {
    await prisma.song.delete({ where: { id } });
  }
}
