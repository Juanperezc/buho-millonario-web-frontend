export interface SignUpUserInterface {
  firstName: string;
  lastName: string;
  parishId: string | number;
  dni: string;
  birthDate: Date;
  email: string;
  password: string;
}

export interface SignInUserInterface {
  email: string;
  password: string;
}

export interface ForgotPasswordInterface {
 email: string;
}

export interface ResetPasswordInterface {
  password: string;
  token: string;
}

export interface CloseAccountInterface {
  closeReason: string;
}

export interface UpdateProfileInterface {
  firstName: string;
  lastName: string;
  parishId: string | number;
  birthDate: Date;
  phone: string;
  address: string;
}
