import { IBussines } from "../interfaces/bussinesInterface";
import { IModelDB } from "../interfaces/interfaceModel";
import { IBussinesRepository } from "../interfaces/interfaceRepository";

export class BussinesRepository implements IBussinesRepository {
    private modelDB: IModelDB
    constructor(modelDB: IModelDB){
        this.modelDB = modelDB 
    }
    save(bussinesData: IBussines['bussinesData']): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async get(bussinesData: IBussines['bussinesData']): Promise<any> {
        try {


            const model = await this.modelDB.syncModel()

            console.log(model)

            const resultUsers = await model.findAll({
                where: {
                    ...bussinesData
                }
            });

            const jsonResults = resultUsers.map((result: any) => result.toJSON());

            return jsonResults;
        } catch (error) {
            console.error('Erro durante o cadastro:', error);
            return false;
        }
    }
    update(bussinesData: IBussines['bussinesData'], arg1: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    login(bussinesData: IBussines['bussinesData']): Promise<any> {
        throw new Error("Method not implemented.");
    }
}