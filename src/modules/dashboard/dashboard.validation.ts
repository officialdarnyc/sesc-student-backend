import joi from 'joi';

import { validate } from '../../../src/utils/validator';

const { object, string, number, array } = joi.types();



export const validateRegisterCourse = (payload: unknown): { studentId: string,courseId:number } => {
  const schema = object.keys({
    studentId: string.max(10).required(),
    courseId: number.min(1).required(),
 
  });

  return validate(payload, schema);
};

