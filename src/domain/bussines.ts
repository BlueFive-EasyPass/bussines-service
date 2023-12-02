import { IBussines } from "../interfaces/bussinesInterface";
import { IBussinesService } from "../interfaces/interfaceService";

export class Bussines implements IBussines {
    bussinesData: IBussines['bussinesData']
    private bussinesService: IBussinesService

    constructor(bussinesData: IBussines['bussinesData'], bussinesService: IBussinesService) {
        this.bussinesData = bussinesData
        this.bussinesService = bussinesService
    }

    async saveToDatabase() {
        try {
            const resultSearch = await this.bussinesService.searchUser(this.bussinesData)
            if (resultSearch) {
                return resultSearch
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }
    searchBussines() {
    }
    updateBussines(arg0: any) {
    }
    loginSystem() {
    }
}