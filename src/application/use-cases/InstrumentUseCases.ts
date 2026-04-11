import { IInstrumentRepository } from '@/domain/repositories/IInstrumentRepository';
import { Instrument } from '@/domain/entities/Instrument';

export class InstrumentUseCases {
  constructor(private instrumentRepo: IInstrumentRepository) {}

  async getAllInstruments(): Promise<Instrument[]> {
    return this.instrumentRepo.findAll();
  }

  async createInstrument(name: string): Promise<Instrument> {
    return this.instrumentRepo.create({ name });
  }

  async deleteInstrument(id: number): Promise<void> {
    return this.instrumentRepo.delete(id);
  }
}
