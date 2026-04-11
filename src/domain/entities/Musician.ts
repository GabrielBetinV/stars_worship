export enum MusicianStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export interface Musician {
  id: number;
  name: string;
  instrumentId: number;
  status: MusicianStatus;
}
