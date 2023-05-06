import { BaseRepository } from './BaseRepository';
import { StudentsCourses } from '../models/StudentsCourses';
  // @ts-ignore

export class StudentsCoursesRepo extends BaseRepository<StudentsCourses> {
  StudentsCourses: StudentsCourses;

  constructor() {
    super(StudentsCourses);
  }
}
