'use server'

import { instrumentUseCases } from '@/infrastructure/di/container';
import { revalidatePath } from 'next/cache';

export async function createInstrumentAction(formData: FormData) {
  const name = formData.get('name') as string;
  await instrumentUseCases.createInstrument(name);
  revalidatePath('/admin/instruments');
}

export async function deleteInstrumentAction(id: number) {
  await instrumentUseCases.deleteInstrument(id);
  revalidatePath('/admin/instruments');
}

export async function getInstrumentsAction() {
  return instrumentUseCases.getAllInstruments();
}
