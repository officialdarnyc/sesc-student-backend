export interface ProcessSignupParams {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;


}
export interface ProcessLoginProps {
    canLogin: boolean;
    message: string;
    data?: { [key: string]: any };
  }