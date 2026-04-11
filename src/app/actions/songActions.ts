'use server'

import { songUseCases } from '@/infrastructure/di/container';
import { revalidatePath } from 'next/cache';

export async function createSongAction(formData: FormData) {
  const name = formData.get('name') as string;
  const key = formData.get('key') as string;
  const youtubeUrl = formData.get('youtubeUrl') as string;
  await songUseCases.createSong(name, key, youtubeUrl);
  revalidatePath('/admin/songs');
}

export async function getSongsAction() {
  return songUseCases.getAllSongs();
}
