import { IServiceRepository } from '@/domain/repositories/IServiceRepository';
import { Service, ServiceWithDetails } from '@/domain/entities/Service';
import prisma from '../db/prisma';

export class PrismaServiceRepository implements IServiceRepository {
  async findAll(): Promise<ServiceWithDetails[]> {
    const services = await prisma.service.findMany({
      include: {
        assignments: {
          include: {
            musician: {
              include: { instrument: true }
            }
          }
        },
        songs: {
          include: { song: true }
        }
      },
      orderBy: { date: 'asc' }
    });

    return services.map((s: any) => ({
      ...s,
      assignments: s.assignments.map((a: any) => ({
        musician: {
          name: a.musician.name,
          instrument: { name: a.musician.instrument.name }
        }
      })),
      songs: s.songs.map((so: any) => ({
        song: {
          name: so.song.name,
          key: so.song.key,
          youtubeUrl: so.song.youtubeUrl
        }
      }))
    }));
  }

  async findById(id: number): Promise<ServiceWithDetails | null> {
    const s = await prisma.service.findUnique({
      where: { id },
      include: {
        assignments: { include: { musician: { include: { instrument: true } } } },
        songs: { include: { song: true } }
      }
    });

    if (!s) return null;

    return {
      ...s,
      assignments: s.assignments.map((a: any) => ({
        musician: {
          name: a.musician.name,
          instrument: { name: a.musician.instrument.name }
        }
      })),
      songs: s.songs.map((so: any) => ({
        song: {
          name: so.song.name,
          key: so.song.key,
          youtubeUrl: so.song.youtubeUrl
        }
      }))
    };
  }

  async create(date: Date): Promise<Service> {
    return prisma.service.create({ data: { date } });
  }

  async assignMusician(serviceId: number, musicianId: number): Promise<void> {
    await prisma.serviceAssignment.create({
      data: { serviceId, musicianId }
    });
  }

  async assignSong(serviceId: number, songId: number): Promise<void> {
    await prisma.serviceSong.create({
      data: { serviceId, songId }
    });
  }

  async delete(id: number): Promise<void> {
    await prisma.service.delete({ where: { id } });
  }
}
