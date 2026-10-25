import { USER_ROLE_ENUM } from "@/app/enum/user-role-enum";

export interface AuthResponse {
  access_token: string;
  name: string;
  email: string;
  role: USER_ROLE_ENUM;
}