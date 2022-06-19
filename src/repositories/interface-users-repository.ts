import { User } from "../entities/user";

export interface IFindByEmailAndUuidData {
  email: string;
  uuid: string;
}

export interface ICreateUserData{
  uuid:string
  email:string
  username:string
  avatar_url?:string
}

export interface IUsersRepository {
  create(data:ICreateUserData): Promise<User>;

  findByEmailAndUuid(data:IFindByEmailAndUuidData): Promise<boolean>;
}