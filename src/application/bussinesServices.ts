import { IBussines } from "../interfaces/bussinesInterface";
import { IBussinesRepository } from "../interfaces/interfaceRepository";
import { IBussinesService } from "../interfaces/interfaceService";

export class BussinesService implements IBussinesService {
    private bussinesRepository: IBussinesRepository

    constructor(bussinesRepository: IBussinesRepository) {
        this.bussinesRepository = bussinesRepository
    }

    async cancel(bussinesData: IBussines['bussinesData']) {
        try {
    
          return await this.bussinesRepository.cancel(bussinesData)
        } catch (error) {
          throw new Error("Erro ao salvar no banco de dados");
        }
      }
    
      async activate(bussinesData: IBussines['bussinesData']) {
        try {
    
          return await this.bussinesRepository.activate(bussinesData)
        } catch (error) {
          throw new Error("Erro ao salvar no banco de dados");
        }
      }

      async sendImage(image: IBussines['imagem']): Promise<boolean> {
        try {
          const resultSend = await this.bussinesRepository.image(image)
    
          return resultSend
        } catch (error) {
          throw new Error("Erro ao salvar no banco de dados");
        }
      }
    
      async getImage(image: IBussines['imagem']): Promise<any> {
        try {
          const resultSend: Buffer = await this.bussinesRepository.getimage(image)
    
          return resultSend
        } catch (error) {
          throw new Error("Erro ao salvar no banco de dados");
        }
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
    async search(bussinesData: IBussines['bussinesData']): Promise<any> {
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

    async update(bussinesData: IBussines['bussinesData'], param: any): Promise<any> {
        try {
            console.log(bussinesData)
            const resultUpdate = await this.bussinesRepository.update(bussinesData, param)
            console.log(resultUpdate)

            if (resultUpdate) {
                return resultUpdate
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    }

    async loginSystem(bussinesData: IBussines['bussinesData']): Promise<any> {
        try {
            console.log(bussinesData)
            const result = await this.bussinesRepository.login(bussinesData)
            console.log(result)

            if (result) {
                return result
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    }

    async createPassword(bussinesData: IBussines['bussinesData']): Promise<any> {
        try {
            console.log(bussinesData)
            const resultUpdate = await this.bussinesRepository.createpassword(bussinesData)
            console.log(resultUpdate)

            if (resultUpdate) {
                return resultUpdate
            } else {
                return false
            }
        } catch (error) {
            return false
        }
    }
}