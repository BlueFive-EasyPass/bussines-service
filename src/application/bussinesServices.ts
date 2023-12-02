import { IBussines } from "../interfaces/bussinesInterface";
import { IBussinesRepository } from "../interfaces/interfaceRepository";
import { IBussinesService } from "../interfaces/interfaceService";

export class BussinesService implements IBussinesService {
    private bussinesRepository: IBussinesRepository
    constructor(bussinesRepository: IBussinesRepository){
        this.bussinesRepository = bussinesRepository
    }
    signUp(bussinesData: IBussines['bussinesData']): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    async searchUser(bussinesData: IBussines['bussinesData']): Promise<any> {
        try {
            const resultSearch = await this.bussinesRepository.get(bussinesData)
            if (resultSearch) {
                return resultSearch
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    }
    updateUser(bussinesData: IBussines['bussinesData'], arg1: any): Promise<any> {
        throw new Error("Method not implemented.");
    }
    loginSystem(bussinesData: IBussines['bussinesData']): Promise<any> {
        throw new Error("Method not implemented.");
    }
}