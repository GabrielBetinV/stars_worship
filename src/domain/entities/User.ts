export enum UserRole {
  ADMIN = 'ADMIN',
  MUSICIAN = 'MUSICIAN'
}

export interface User {
  id: number;
  email: string;
  password?: string;
  role: UserRole;
}
