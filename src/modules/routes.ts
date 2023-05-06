import { Router } from 'express';
import { routes as authRoutes } from './auth';
import { routes as dashboardRoutes } from './dashboard';


export const initiateModuleRoutes = (router: Router): void => {
  router.use('/v1/auth', authRoutes);
  router.use('/v1/dashboard', dashboardRoutes);
};
