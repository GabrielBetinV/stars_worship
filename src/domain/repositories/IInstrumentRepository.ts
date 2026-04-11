import { Instrument } from '../entities/Instrument';

export interface IInstrumentRepository {
  findAll(): Promise<Instrument[]>;
  findById(id: number): Promise<Instrument | null>;
  create(instrument: Omit<Instrument, 'id'>): Promise<Instrument>;
  update(id: number, instrument: Partial<Instrument>): Promise<Instrument>;
  delete(id: number): Promise<void>;
}
