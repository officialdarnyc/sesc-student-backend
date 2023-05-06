import { RequestHandler } from 'express';
import { responseHandler } from '../../helpers/response';
import * as dashboardService from './dashboard.service';
import { validateRegisterCourse } from './dashboard.validation';



export const getCourses: RequestHandler = async (req, res, next) => {

  try {
    const courses = await dashboardService.processGetCourses();
    res.json(responseHandler('Courses data retrieved successfully', courses));
  } catch (error) {
    next(error);
  }
};
export const getRegisteredCourses: RequestHandler = async (req, res, next) => {

  try {
    const studentId =  req.params.studentId
    console.log(studentId,"yeuw")
    const courses = await dashboardService.processGeRegisteredtCourses(studentId);
    res.json(responseHandler('Student registered courses retrieved successfully', courses));
  } catch (error) {
    next(error);
  }
};

export const registerCourses: RequestHandler = async (req, res, next) => {


  try {
    console.log(req.body,"passs")
    const validatedData = validateRegisterCourse(req.body);
   
    const courses = await dashboardService.processRegisterCourses(validatedData);
    res.json(responseHandler(courses.message, courses.data));
  } catch (error) {
    next(error);
  }
};
export const status: RequestHandler = async (req, res, next) => {
  try {

    const studentId =  req.params.studentId
   
    const result = await dashboardService.processStatus(studentId);

    res.json(responseHandler(result.message, result.data));
  } catch (error) {
    next(error);
  }
};
