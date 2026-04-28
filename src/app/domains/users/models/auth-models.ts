import { UserRole } from './user-models';

export interface RegisterForm {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  passwordConfirmation: string;
}

export interface LoginResponse {
  token: string;
  currUser: LimitedUserData;
}

export interface LimitedUserData {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  role: UserRole;
}
