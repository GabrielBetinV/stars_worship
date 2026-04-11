import { IInstrumentRepository } from '@/domain/repositories/IInstrumentRepository';
import { Instrument } from '@/domain/entities/Instrument';
import prisma from '../db/prisma';

export class PrismaInstrumentRepository implements IInstrumentRepository {
  async findAll(): Promise<Instrument[]> {
    return prisma.instrument.findMany();
  }

  async findById(id: number): Promise<Instrument | null> {
    return prisma.instrument.findUnique({ where: { id } });
  }

  async create(instrument: Omit<Instrument, 'id'>): Promise<Instrument> {
    return prisma.instrument.create({ data: instrument });
  }

  async update(id: number, instrument: Partial<Instrument>): Promise<Instrument> {
    return prisma.instrument.update({ where: { id }, data: instrument });
  }

  async delete(id: number): Promise<void> {
    await prisma.instrument.delete({ where: { id } });
  }
}
