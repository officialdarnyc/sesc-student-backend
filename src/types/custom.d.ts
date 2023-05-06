import { StudentsAttributes } from '../database/models/Students';


declare global {
  namespace Express {
    interface Request {
      user?: StudentsAttributes;
  
    }
  }
}
