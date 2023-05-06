import joi from 'joi';
import { validate } from '../../../src/utils/validator';

const { object, string } = joi.types();

const passwordSchema = object.keys({
  password: string.min(5).required()
});

export const validateLoginRequestBody = (payload: unknown): { email: string; password: string } => {
  const schema = passwordSchema.keys({
    email: string.email().trim().required()
  });

  return validate(payload, schema);
};

export const validateSignupRequestBody = (
  payload: unknown
): {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
} => {
  const schema = object.keys({
    firstName: string.trim().required(),
    lastName: string.trim().required(),
    email: string.email().trim().required(),
    password: string.min(5).required()
  });

  return validate(payload, schema);
};
export const validateProfileEdit = (
  payload: unknown
): {
  firstName: string;
  lastName: string;
} => {
  const schema = object.keys({
    firstName: string.trim().optional(),
    lastName: string.trim().optional()
  });

  return validate(payload, schema);
};

export const validateEmail = (payload: unknown): { email: string } => {
  const schema = object.keys({
    email: string.email().trim().required()
  });

  return validate(payload, schema);
};
