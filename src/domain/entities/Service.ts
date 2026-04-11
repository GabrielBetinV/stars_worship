export interface Service {
  id: number;
  date: Date;
}

export interface ServiceAssignment {
  serviceId: number;
  musicianId: number;
}

export interface ServiceSong {
  serviceId: number;
  songId: number;
}

export interface ServiceWithDetails extends Service {
  assignments: { musician: { name: string, instrument: { name: string } } }[];
  songs: { song: { name: string, key: string, youtubeUrl: string } }[];
}
