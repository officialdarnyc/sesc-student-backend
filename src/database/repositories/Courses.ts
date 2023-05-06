import { BaseRepository } from './BaseRepository';
import { Courses } from '../models/Courses';


 // @ts-ignore
export class CoursesRepo extends BaseRepository<Courses> {
  project: Courses;

  constructor() {
    super(Courses);
  }
}
