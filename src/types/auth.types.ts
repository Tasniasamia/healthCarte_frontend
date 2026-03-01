export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  token: string;
  user: user;
}
export interface user {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string;
  image?: string | null | undefined | undefined;
  role: string;
  status: string;
  needPasswordChanges: boolean;
  isDeleted: boolean;
  deletedAt?: Date | null | undefined;
}
