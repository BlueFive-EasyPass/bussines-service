import { IBussines } from "./bussinesInterface";

export interface IBussinesRepository {
    save(bussinesData: IBussines['bussinesData']): Promise<any>;
    get(bussinesData: IBussines['bussinesData']): Promise<any>;
    update(bussinesData: IBussines['bussinesData'], arg1: any): Promise<any>
    login(bussinesData: IBussines['bussinesData']): Promise<any>;
}