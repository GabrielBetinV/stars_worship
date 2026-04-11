'use server'

import { musicianUseCases } from '@/infrastructure/di/container';
import { revalidatePath } from 'next/cache';

export async function createMusicianAction(formData: FormData) {
  const name = formData.get('name') as string;
  const instrumentId = parseInt(formData.get('instrumentId') as string);
  await musicianUseCases.createMusician(name, instrumentId);
  revalidatePath('/admin/musicians');
}

export async function toggleMusicianStatusAction(id: number) {
  await musicianUseCases.toggleStatus(id);
  revalidatePath('/admin/musicians');
}

export async function deleteMusicianAction(id: number) {
  await musicianUseCases.deleteMusician(id);
  revalidatePath('/admin/musicians');
}

export async function getMusiciansAction() {
  return musicianUseCases.getAllMusicians();
}
