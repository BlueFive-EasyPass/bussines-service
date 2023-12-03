import { IBussines } from "../interfaces/bussinesInterface";
import { IBussinesRepository } from "../interfaces/interfaceRepository";
import { IBussinesService } from "../interfaces/interfaceService";

export class BussinesService implements IBussinesService {
    private bussinesRepository: IBussinesRepository

    constructor(bussinesRepository: IBussinesRepository) {
        this.bussinesRepository = bussinesRepository
    }

    async signUp(bussinesData: IBussines['bussinesData']): Promise<boolean> {
        try {
            const resultSignUp = await this.bussinesRepository.save(bussinesData)

            if (resultSignUp) {
                return true
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    }
    async searchUser(bussinesData: IBussines['bussinesData']): Promise<any> {
        try {
            console.log(bussinesData)
            const resultSearch = await this.bussinesRepository.get(bussinesData)
            console.log(resultSearch)

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