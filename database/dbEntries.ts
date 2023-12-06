import { isValidObjectId } from 'mongoose';
import { db } from '@/database';
import { Entry, IEntry } from '@/models';

export const getEntryById = async (id: string) : Promise<IEntry | null> => {
  if(!isValidObjectId) return null;

  db.connect();
  const entry = await Entry.findById(id).lean();
  db.disconnect();

  return JSON.parse(JSON.stringify(entry));
}