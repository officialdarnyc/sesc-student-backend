import { UserRole } from './dashboard.constant';
import { ConflictError, UnAuthorizedError } from '../../errors';

import { StudentsRepo } from '../../database/repositories/Students';
import { CoursesRepo } from '../../database/repositories/Courses';
import { StudentsCoursesRepo } from '../../database/repositories/StudentsCourses';
import { StudentsCourses } from '../../database/models/StudentsCourses';
import { Courses } from '../../database/models/Courses';
import { callCreateInvoice, callgetStatus } from '../../integrations/Finance/Base';

const coursesRepo = new CoursesRepo();
const studentCourses = new StudentsCoursesRepo();
const studentsRepo = new StudentsRepo();

const dateFormat = () => {
  const currentDate = new Date();

  const dueDate = new Date(currentDate.getTime() + 14 * 24 * 60 * 60 * 1000);

  const year = dueDate.getUTCFullYear();
  const month = ('0' + (dueDate.getUTCMonth() + 1)).slice(-2);
  const day = ('0' + dueDate.getUTCDate()).slice(-2);

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

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

  // @ts-ignore
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
  // @ts-ignore
  if (!student) {
    throw new UnAuthorizedError('Student not found');
  }
  // @ts-ignore
  if (!course) {
    throw new UnAuthorizedError('This course does not exists');
  }

  const date = dateFormat();
  const invoice = await callCreateInvoice({
   

    amount: course.fee,
    dueDate: date,
    type: 'TUITION_FEES',
    account: {
      studentId: student.externalStudentId
    }
  });
  if (student) {
    await studentCourses.create({
      studentId: student.id,
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

  const students = await studentsRepo.findOne({
    where: { externalStudentId: studentId }
  });

  
  if (students) {
    const courses = await studentsRepo.findOne({
      where: { id: students.id },
      include: {
        model: Courses,
        as: 'courses',
        through: {
          attributes: ['reference', 'createdAt', 'externalStudentId', 'status']
        }
      }
    });
    return courses;
  }

  // @ts-ignore

  if (!students) {
    throw new UnAuthorizedError('this student is not registered');
  }
};
export const processStatus = async (studentId: string): Promise<any> => {
  // @ts-ignore
  const status = await callgetStatus(studentId);

  return {
    canLogin: true,
    message: 'status retrieved ',
    data: {
      hasOutstandingBalance: status.hasOutstandingBalance
    }
  };
};
