import { Router } from 'express';
import * as authController from './auth.controller';

const router = Router();

router.get('/', (_req, res) => res.send('sesc'));

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/profile/:studentId', authController.profile);
router.patch('/profile/:studentId', authController.profileEdit);

export default router;
