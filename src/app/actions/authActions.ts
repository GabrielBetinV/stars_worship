'use server'

import { authUseCases } from '@/infrastructure/di/container';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { UserRole } from '@/domain/entities/User';

export async function signupAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = (formData.get('role') as UserRole) || UserRole.MUSICIAN;

  try {
    await authUseCases.register(email, password, role);
  } catch (e: any) {
    return { error: e.message };
  }
  redirect('/login');
}

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const token = await authUseCases.login(email, password);
    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/'
    });
  } catch (e: any) {
    return { error: e.message };
  }

  // Redirect based on generic landing or specific dashboard
  redirect('/');
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  redirect('/login');
}
