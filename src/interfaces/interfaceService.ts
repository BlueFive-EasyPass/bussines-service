import { IBussines } from "./bussinesInterface";

export interface IBussinesService {
    signUp(userData: IBussines['bussinesData']): Promise<boolean>;
    searchUser(userData: IBussines['bussinesData']): Promise<any>;
    updateUser(userData: IBussines['bussinesData'], arg1: any): Promise<any>;
    loginSystem(userData: IBussines['bussinesData']): Promise<any>;
  }
  