import { IBussines } from "./bussinesInterface";

export interface IBussinesService {
    signUp(userData: IBussines['bussinesData']): Promise<boolean>;
    search(userData: IBussines['bussinesData']): Promise<any>;
    update(userData: IBussines['bussinesData'], arg1: any): Promise<any>;
    loginSystem(userData: IBussines['bussinesData']): Promise<any>;
    cancel(userData: IBussines['bussinesData']): Promise<boolean>
    activate(userData: IBussines['bussinesData']): Promise<boolean>
    sendImage(image: IBussines['imagem']): Promise<boolean>
    getImage(image: IBussines['imagem']): Promise<any>
    createPassword(userData: IBussines['bussinesData']): Promise<any>
  }
  