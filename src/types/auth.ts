export interface UserData {
  id: string;
  username: string;
  email: string;
  roles: string[];
  permissions?: string[];
}
export interface UserRegistrationData {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
export interface UserLoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
}
export interface AuthResponseError {
  body: {
    error: string;
  };
}
