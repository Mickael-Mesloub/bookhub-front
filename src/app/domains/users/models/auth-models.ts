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
}

export interface AuthUser {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
}
