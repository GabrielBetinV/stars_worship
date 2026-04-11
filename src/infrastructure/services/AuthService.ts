import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';

const SECRET_KEY = Buffer.from(process.env.JWT_SECRET || 'secret-key-too-short-change-it', 'utf8');

export class AuthService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(password: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(password, hashed);
  }

  async generateToken(payload: any): Promise<string> {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('24h')
      .sign(SECRET_KEY);
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);
      return payload;
    } catch (e) {
      return null;
    }
  }
}
