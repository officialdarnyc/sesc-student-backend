import { BaseRepository } from './BaseRepository';
import { Students } from '../models/Students';


 // @ts-ignore
export class StudentsRepo extends BaseRepository<Students> {
  project: Students;

  constructor() {
    super(Students);
  }
}
