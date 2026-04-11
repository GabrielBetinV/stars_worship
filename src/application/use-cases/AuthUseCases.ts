import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { AuthService } from '@/infrastructure/services/AuthService';
import { User, UserRole } from '@/domain/entities/User';

export class AuthUseCases {
  constructor(
    private userRepo: IUserRepository,
    private authService: AuthService
  ) {}

  async register(email: string, password: string, role: UserRole = UserRole.MUSICIAN): Promise<User> {
    const existing = await this.userRepo.findByEmail(email);
    if (existing) throw new Error('User already exists');

    const hashedPassword = await this.authService.hashPassword(password);
    return this.userRepo.create({
      email,
      password: hashedPassword,
      role
    });
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepo.findByEmail(email);
    if (!user || !user.password) throw new Error('Invalid credentials');

    const valid = await this.authService.comparePasswords(password, user.password);
    if (!valid) throw new Error('Invalid credentials');

    return this.authService.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });
  }
}
