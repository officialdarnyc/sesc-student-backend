import { UserRole } from './dashboard.constant';
import { ConflictError, UnAuthorizedError } from '../../errors';

import { StudentsRepo } from '../../database/repositories/Students';
import { CoursesRepo } from '../../database/repositories/Courses';
import { StudentsCoursesRepo } from '../../database/repositories/StudentsCourses';
import { StudentsCourses } from '../../database/models/StudentsCourses';
import { Courses } from '../../database/models/Courses';
import { callCreateInvoice, callgetStatus } from '../../integrations/Finance/Base';
import { dateFormat } from '../../utils/date';

const coursesRepo = new CoursesRepo();
const studentCourses = new StudentsCoursesRepo();
const studentsRepo = new StudentsRepo();

export const processGetCourses = async (options?: { limit: number; offset: number }): Promise<any> => {
  // @ts-ignore

  const courses = await coursesRepo.findAll({
    order: [['createdAt', 'DESC']],
    attributes: ['id', 'name', 'description', 'fee', 'lessons', 'createdAt']
  });

  return courses;
};

export const processRegisterCourses = async (data: { studentId: string; courseId: number }): Promise<any> => {
    // @ts-ignore
  const student = await studentsRepo.findOne({
    where: {
      externalStudentId: data.studentId
    }
  });
    
  const course = await coursesRepo.findOne({
    where: {
      id: data.courseId
    }
  });
  // @ts-ignore

  const studentCourse = await studentCourses.findOne({
    where: {
      externalStudentId: data.studentId,
      courseId: data.courseId
    }
  });
  if (studentCourse) {
    throw new ConflictError('This course has been registered');
  }

  if (!student) {
    throw new UnAuthorizedError('Student not found');
  }
  if (!course) {
    throw new UnAuthorizedError('This course does not exists');
  }
  const date = dateFormat();

  const invoice = await callCreateInvoice({
    // @ts-ignore

    amount: course.fee,
    dueDate: date,
    type: 'TUITION_FEES',
    account: {
      studentId: data.studentId
    } 
  });
  
  
  if (student) {
    // @ts-ignore
    await studentCourses.create({
      externalStudentId: data.studentId,
      courseId: data.courseId,
      reference: invoice.reference,
      createdAt: new Date()
    });
  }


  return {
    message: 'courses registered successfully',
    data: {
      invoice
    }
  };
};

export const processGeRegisteredtCourses = async (studentId: string): Promise<any> => {
  // @ts-ignore

  const courses = await studentsRepo.findOne({
    where: { externalStudentId: studentId },
    include: {
      model: Courses,
      as: 'courses',
      through: {
        attributes: ['reference','createdAt','externalStudentId',"status"],
      }
    }
  });
  if (courses) {
  
   
      return courses
  

  }
  // @ts-ignore

  if (!courses) {
    throw new UnAuthorizedError("this student is not registered");
  }
  

};
export const processStatus = async (studentId:string): Promise<any> => {
  // @ts-ignore
  const status = await callgetStatus(studentId)

  return {
    canLogin: true,
    message: 'status retrieved ',
    data: {
      hasOutstandingBalance:status.hasOutstandingBalance
    }
  };
};