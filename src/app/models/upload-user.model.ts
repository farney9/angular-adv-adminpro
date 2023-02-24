import { UserModel } from "./user.model";

export interface UploadUserModel {
  total: number,
  usuario: UserModel[]
}