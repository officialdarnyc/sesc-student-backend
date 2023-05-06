import { Router } from 'express';
import * as dashboardController from './dashboard.controller';


const router = Router();

router.get('/courses', dashboardController.getCourses);
router.post('/courses', dashboardController.registerCourses);
router.get('/courses/:studentId', dashboardController.getRegisteredCourses);
router.get('/eligibility/:studentId', dashboardController.status);

export default router;
