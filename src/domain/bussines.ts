import { IBussines } from "../interfaces/bussinesInterface";
import { IBussinesService } from "../interfaces/interfaceService";

export class Bussines implements IBussines {
    bussinesData: IBussines['bussinesData']
    bussinesImage: IBussines['imagem']
    private bussinesService: IBussinesService

    constructor(bussinesData: IBussines['bussinesData'], bussinesService: IBussinesService, bussinesImage: IBussines['imagem']) {
        this.bussinesData = bussinesData
        this.bussinesService = bussinesService
        this.bussinesImage = bussinesImage
    }

    async cancel() {
        try {
            console.log(this.bussinesData)
            console.log(this.bussinesService)
            const returnCancel = await this.bussinesService.cancel(this.bussinesData)
            return returnCancel
        } catch (error) {
            console.log('ERRO PARA CARALHO')
            throw new Error("Erro ao salvar no banco de dados");
        }
    }

    async activate() {
        try {
            console.log(this.bussinesData)
            console.log(this.bussinesService)
            const returnCancel = await this.bussinesService.activate(this.bussinesData)
            return returnCancel
        } catch (error) {
            console.log('ERRO PARA CARALHO')
            throw new Error("Erro ao salvar no banco de dados");
        }
    }

    async sendImage() {
        try {
            const resultSend = await this.bussinesService.sendImage(this.bussinesImage)

            return resultSend
        } catch (error) {
            throw new Error("Erro ao salvar no banco de dados");
        }
    }

    async getImage() {
        try {
            const resultSend: Buffer = await this.bussinesService.getImage(this.bussinesImage)

            return resultSend
        } catch (error) {
            throw new Error("Erro ao salvar no banco de dados");
        }
    }

    async saveToDatabase() {
        try {
            const resultSignUp = await this.bussinesService.signUp(this.bussinesData)

            if (resultSignUp) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }
    async search() {
        try {
            const resultSearch = await this.bussinesService.search(this.bussinesData)
            console.log(resultSearch)

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

    async update(param: any) {
        try {
            const resultUpdate = await this.bussinesService.update(this.bussinesData, param)
            console.log(resultUpdate)

            if (resultUpdate) {
                return resultUpdate
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async loginSystem() {
        try {
            const result = await this.bussinesService.loginSystem(this.bussinesData)
            console.log(result)

            if (result) {
                return result
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async createPassword() {
        try {
            const resultUpdate = await this.bussinesService.createPassword(this.bussinesData)
            console.log(resultUpdate)

            return resultUpdate

        } catch (error) {
            console.log(error)
            return false
        }
    }
}