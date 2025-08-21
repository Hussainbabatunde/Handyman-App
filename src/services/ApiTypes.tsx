 export interface ValidatePhone {
    countryCode: string,
    phoneNumber: string
}

export interface verifyType {
    phoneNo: string
}

export interface verifyPhoneResType {
    message: string,
    otp: string,
    sessionId: string
}

export interface validatePhoneResponse {
  message: string;
  status: boolean;
  data: UserData | null;
}

export interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userType: number;
  createdAt: string;  // ISO date string
  updatedAt: string;  // ISO date string
}

export interface validateType {
    sessionId: string,
    phoneNo: string,
    otp: string
}

export interface createUserType {
    email: string,
    lastName: string,
    firstName: string,
    userType: number | string,
    phoneNumber: string,
    password: string,
    confirmPassword: string
}

export interface RegisterResponse {
  message: string;
  accessToken: string;
  data: UserData;
}

export interface UserData {
  id: number;
  email: string;
  phoneNumber: string;
  lastName: string;
  firstName: string;
  userType: number;
  updatedAt: string; // ISO date string
  createdAt: string; // ISO date string
}
