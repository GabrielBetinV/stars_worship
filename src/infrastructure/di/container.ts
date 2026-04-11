import { PrismaInstrumentRepository } from '../repositories/PrismaInstrumentRepository';
import { PrismaMusicianRepository } from '../repositories/PrismaMusicianRepository';
import { PrismaSongRepository } from '../repositories/PrismaSongRepository';
import { PrismaServiceRepository } from '../repositories/PrismaServiceRepository';
import { PrismaUserRepository } from '../repositories/PrismaUserRepository';
import { AuthService } from '../services/AuthService';
import { InstrumentUseCases } from '@/application/use-cases/InstrumentUseCases';
import { MusicianUseCases } from '@/application/use-cases/MusicianUseCases';
import { SongUseCases } from '@/application/use-cases/SongUseCases';
import { SchedulingUseCases } from '@/application/use-cases/SchedulingUseCases';
import { AuthUseCases } from '@/application/use-cases/AuthUseCases';

const instrumentRepo = new PrismaInstrumentRepository();
const musicianRepo = new PrismaMusicianRepository();
const songRepo = new PrismaSongRepository();
const serviceRepo = new PrismaServiceRepository();
const userRepo = new PrismaUserRepository();
const authService = new AuthService();

export const instrumentUseCases = new InstrumentUseCases(instrumentRepo);
export const musicianUseCases = new MusicianUseCases(musicianRepo);
export const songUseCases = new SongUseCases(songRepo);
export const schedulingUseCases = new SchedulingUseCases(serviceRepo);
export const authUseCases = new AuthUseCases(userRepo, authService);
