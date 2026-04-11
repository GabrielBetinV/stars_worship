import { IMusicianRepository } from '@/domain/repositories/IMusicianRepository';
import { Musician, MusicianStatus } from '@/domain/entities/Musician';
import prisma from '../db/prisma';

export class PrismaMusicianRepository implements IMusicianRepository {
  async findAll(): Promise<Musician[]> {
    const musicians = await prisma.musician.findMany();
    return musicians.map((m: any) => ({
      ...m,
      status: m.status as MusicianStatus
    }));
  }

  async findById(id: number): Promise<Musician | null> {
    const m = await prisma.musician.findUnique({ where: { id } });
    if (!m) return null;
    return {
      ...m,
      status: m.status as MusicianStatus
    };
  }

  async create(musician: Omit<Musician, 'id'>): Promise<Musician> {
    const m = await prisma.musician.create({ data: musician });
    return {
      ...m,
      status: m.status as MusicianStatus
    };
  }

  async update(id: number, musician: Partial<Musician>): Promise<Musician> {
    const m = await prisma.musician.update({ where: { id }, data: musician });
    return {
      ...m,
      status: m.status as MusicianStatus
    };
  }

  async delete(id: number): Promise<void> {
    await prisma.musician.delete({ where: { id } });
  }
}
