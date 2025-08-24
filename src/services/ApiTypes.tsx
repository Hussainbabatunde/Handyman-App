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

export interface ArtisanByProfessionType {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  userType: number; // if you have predefined roles, this could be an enum instead
  userJobType: string[];
  createdAt: string; // ISO string (Date in string form)
  updatedAt: string;
}

export interface BookingResponse {
  message: string;
  data: {
    booking: {
      id: number;
      scheduledAt: string;  // ISO date string
      location: string;
      notes: string;
      requestedBy: number;
      assignedArtisan: number;
      jobTypeKey: number;
      artisanStatus: "pending" | "accepted" | "rejected" | string; // adjust if more statuses
      status: "pending" | "completed" | "in progress" | string;      // adjust if more statuses
      updatedAt: string;  // ISO date string
      createdAt: string;  // ISO date string
    };
  };
}


export interface UserInfo {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Booking {
  id: number;
  scheduledAt: string;   // ISO string from DB
  location: string;
  notes: string;
  requestedBy: number;
  assignedArtisan: number;
  jobTypeKey: number;
  artisanStatus: "pending" | "accepted" | "rejected" | string; // extend as needed
  status: "pending" | "confirmed" | "completed" | "cancelled" | string; // extend as needed
  createdAt: string;
  updatedAt: string;
  requester: UserInfo;
  artisan: UserInfo;
}