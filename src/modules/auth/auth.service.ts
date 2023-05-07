import { ProcessSignupParams, ProcessLoginProps } from './auth.interface';
import { databaseTransaction } from '../../database/databaseTransaction';
import { StudentsRepo } from '../../database/repositories/Students';
import { ConflictError, ForbiddenError, UnAuthorizedError } from '../../errors';
import {  hashString, isHashValid } from '../../helpers/utilities';
import { status } from './auth.constant';
import { nanoid } from 'nanoid';
import { callCreateaccount ,callCreateLibraryAccount, callgetStatus} from '../../integrations/Finance/Base';
import * as uuid from 'uuid'
const studentsRepo = new StudentsRepo();

const randomNumber = Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000;
const randomString = 'c' + randomNumber.toString();



export const processSignup = async (data: ProcessSignupParams): Promise<any> => {
  let generatedStudentId =  randomString;

  const existingStudentId = await studentsRepo.findOne({
    // @ts-ignore
    where: { externalStudentId: generatedStudentId }
  });
  const existingStudent = await studentsRepo.findOne({
    // @ts-ignore
    where: { email: data.email }
  });

  if (existingStudent) {
    throw new UnAuthorizedError('student account with this email already exists.');
  }
    // @ts-ignore

  while (existingStudentId) {
    generatedStudentId = randomString;
  }

  const passwordHash = await hashString(data.password);

  await databaseTransaction(async (t) => {
    await studentsRepo.create(
      {
        firstName: data.firstName,
        ...(data.lastName && { lastName: data.lastName }),
        email: data.email,
        password: passwordHash,
        externalStudentId: generatedStudentId
        
      },

      { transaction: t }
    );
  });

  const account = await callCreateaccount({
    studentId: generatedStudentId
  });
  const library = await callCreateLibraryAccount({
    studentId: generatedStudentId
  });



  return {
    message: 'students data created successfully',
    data: {
      account,
      library
    }
  };
};

export const processLogin = async (email: string, password: string): Promise<ProcessLoginProps> => {
  // @ts-ignore

  const student = await studentsRepo.findOne({ where: { email } });

  if (!student) {
    throw new UnAuthorizedError('Email/Password is incorrect');
  }

  const isValidPassword = await isHashValid(password, student.password);
  if (!isValidPassword) {
    throw new UnAuthorizedError('Email/Password is incorrect');
  }

  // @ts-ignore

  await studentsRepo.update({ lastLoginAt: new Date() }, { where: { id: student.id } });

  return {
    canLogin: true,
    message: 'Login successful',
    data: {
      id: student.id,
      firstName: student.firstName,
      lastName: student.lastName,
      externalStudentId: student.externalStudentId,
      email: student.email,
      createdAt: student.createdAt
    }
  };
};
export const processProfile = async (studentId: string): Promise<any> => {
  // @ts-ignore

  const student = await studentsRepo.findOne({
    where: { externalStudentId: studentId },

  });

  return {
    firstName:student?.firstName,
    lastName:student?.lastName,
    email:student?.email,
    studentId:student?.externalStudentId,
    pasword:"****"
  };
};

export const processProfileEdit = async (studentId: string, payloads: {
  firstName: string,
  lastName: string
}): Promise<any> => {
  const student = await studentsRepo.findOne({
    where: { externalStudentId: studentId },
  });

  if (!student) {
    throw new UnAuthorizedError("You can't perform this operation");
  }

  if (student) {
    await studentsRepo.update(
      { firstName: payloads.firstName, lastName: payloads.lastName },
      { where: { externalStudentId: studentId } }
    );
  }
  

  
};

export const processStatus = async (studentId:string): Promise<ProcessLoginProps> => {
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
