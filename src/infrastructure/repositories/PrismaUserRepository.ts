import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { User, UserRole } from '@/domain/entities/User';
import prisma from '../db/prisma';

export class PrismaUserRepository implements IUserRepository {
  async create(user: Omit<User, 'id'>): Promise<User> {
    const u = await prisma.user.create({ data: user });
    return {
      ...u,
      role: u.role as UserRole
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const u = await prisma.user.findUnique({ where: { email } });
    if (!u) return null;
    return {
      ...u,
      role: u.role as UserRole
    };
  }

  async findById(id: number): Promise<User | null> {
    const u = await prisma.user.findUnique({ where: { id } });
    if (!u) return null;
    return {
      ...u,
      role: u.role as UserRole
    };
  }
}
