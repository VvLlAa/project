export interface User {
  id: number | null;
  name: string;
  email: string;
  phone: string;
  position: UserPosition
}

export interface FormInput {
  name: string;
  email: string;
  phone: string;
}

export interface UserError {
  name: boolean;
  email: boolean;
  phone: boolean;
}

export interface UserPosition {
  x: number;
  y: number;
}
