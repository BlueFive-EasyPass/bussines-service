import { IBussines } from "../interfaces/bussinesInterface";
import { IDatabaseConnection } from "../interfaces/databaseInterface";
import { IModelDB } from "../interfaces/interfaceModel";
import { IBussinesRepository } from "../interfaces/interfaceRepository";

export class BussinesRepository implements IBussinesRepository {
    private modelDB: IModelDB

    constructor(modelDB: IModelDB) {
        this.modelDB = modelDB
    }

    async save(bussinesData: IBussines['bussinesData']): Promise<boolean> {
        try {
            const model: IDatabaseConnection['getInstance'] = await this.modelDB.syncModel()
            const resultSignUp = await model.create({
                ...bussinesData
            })

            if (resultSignUp) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.error('Erro durante o cadastro:', error);
            return false;
        } finally {
            this.modelDB.desconnectModel()
        }
    }

    async get(bussinesData: IBussines['bussinesData']): Promise<any> {
        try {
            const model: IDatabaseConnection['getInstance'] = await this.modelDB.syncModel()
            const resultUsers = await model.findAll({
                where: {
                    ...bussinesData
                }
            });

            const jsonResults = resultUsers.map((result: any) => result.toJSON());
            return jsonResults;
        } catch (error) {
            console.error('Erro durante a pesquisa:', error);
            return false;
        } finally {
            this.modelDB.desconnectModel()
        }
    }
    update(bussinesData: IBussines['bussinesData'], arg1: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    login(bussinesData: IBussines['bussinesData']): Promise<any> {
        throw new Error("Method not implemented.");
    }
}