'use server'

import { schedulingUseCases } from '@/infrastructure/di/container';
import { revalidatePath } from 'next/cache';

export async function createServiceAction(formData: FormData) {
  const date = new Date(formData.get('date') as string);
  const musicianIds = formData.getAll('musicianIds').map(id => parseInt(id as string));
  const songIds = formData.getAll('songIds').map(id => parseInt(id as string));

  await schedulingUseCases.createService(date, musicianIds, songIds);
  revalidatePath('/admin/scheduling');
  revalidatePath('/musician/schedule');
}

export async function getUpcomingServicesAction() {
  return schedulingUseCases.getUpcomingServices();
}

export async function deleteServiceAction(id: number) {
  await schedulingUseCases.deleteService(id);
  revalidatePath('/admin/scheduling');
  revalidatePath('/musician/schedule');
}
