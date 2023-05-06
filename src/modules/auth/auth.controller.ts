import { RequestHandler } from 'express';
import * as authService from './auth.service';
import * as authValidation from './auth.validation';
import { responseHandler } from '../../helpers/response';

export const signup: RequestHandler = async (req, res, next) => {
  try {
    const validData = authValidation.validateSignupRequestBody(req.body);

    const response = await authService.processSignup(validData);

    res.json(responseHandler(response.message,response.data));

  } catch (error) {
    next(error);
  }
};



export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = authValidation.validateLoginRequestBody(req.body);

    const result = await authService.processLogin(email, password);

    res.json(responseHandler(result.message, result.data));
  } catch (error) {
    next(error);
  }
};



export const profile: RequestHandler = async (req, res, next) => {
  try {

    const studentId =  req.params.studentId
   
    const result = await authService.processProfile(studentId);

    res.json(responseHandler("student profile retrieved", result));
  } catch (error) {
    next(error);
  }
};
export const profileEdit: RequestHandler = async (req, res, next) => {
  try {

    const studentId =  req.params.studentId

    const profile = authValidation.validateProfileEdit(req.body);
   
    const result = await authService.processProfileEdit(studentId,profile);

    res.json(responseHandler("student profile edited"));
  } catch (error) {
    next(error);
  }
};


export const status: RequestHandler = async (req, res, next) => {
  try {

    const studentId =  req.params.studentId
   
    const result = await authService.processStatus(studentId);

    res.json(responseHandler(result.message, result.data));
  } catch (error) {
    next(error);
  }
};