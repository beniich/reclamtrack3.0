import Dexie, { Table } from 'dexie';

export interface LocalComplaint {
  localId: string;
  serverId?: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  priority: string;
  address: string;
  city: string;
  district: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  photos: string[];
  isAnonymous: boolean;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  syncState: 'pending' | 'synced' | 'error';
  createdAt: Date;
  updatedAt: Date;
}

export interface OutboxEvent {
  id?: number;
  type: 'CREATE_COMPLAINT' | 'UPDATE_COMPLAINT';
  payload: any;
  localRef: string;
  attempts: number;
  createdAt: Date;
}

class ReclamTrackDB extends Dexie {
  complaints!: Table<LocalComplaint>;
  outbox!: Table<OutboxEvent>;

  constructor() {
    super('ReclamTrackVault');
    this.version(1).stores({
      complaints: '&localId, serverId, syncState, category, priority, createdAt',
      outbox: '++id, localRef, attempts'
    });
  }
}

export const db = new ReclamTrackDB();
