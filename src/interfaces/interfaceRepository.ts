import { IBussines } from "./bussinesInterface";

export interface IBussinesRepository {
    save(bussinesData: IBussines['bussinesData']): Promise<any>;
    get(bussinesData: IBussines['bussinesData']): Promise<any>;
    update(bussinesData: IBussines['bussinesData'], arg1: any): Promise<any>
    login(bussinesData: IBussines['bussinesData']): Promise<any>;
    cancel(userData: IBussines['bussinesData']): Promise<boolean>
    activate(userData: IBussines['bussinesData']): Promise<boolean>
    image(image: IBussines['imagem']): Promise<boolean>
    getimage(image: IBussines['imagem']): Promise<any>
    createpassword(bussinesData: IBussines['bussinesData']): Promise<any>;
}