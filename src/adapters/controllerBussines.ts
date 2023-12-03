import dotenv from 'dotenv'
import { IBussines } from '../interfaces/bussinesInterface'
import { FastifyReply } from 'fastify'
import { IMidBussines } from '../interfaces/interfaceMidBussines'
import { MidBussines } from '../application/midBussines'
import { IController } from '../interfaces/interfaceController'

dotenv.config()

export class BussinesController implements IController {
    private bussines: IBussines
    private mid: IMidBussines

    constructor(bussinesData: IBussines, mid: IMidBussines) {
        this.bussines = bussinesData
        this.mid = mid
    }

    async SignUp(reply: FastifyReply) {
        try {
            const resultFields = this.mid.validateCompleteBussines()
            const resultSignUp = await this.bussines.saveToDatabase()

            if (resultFields && resultSignUp) {
                reply.code(200).send({ send: 'Cadastrado com sucesso' })
            } else if (resultFields) {
                reply.code(400).send({ error: 'Erro ao consultar empresa' })
            } else {
                reply.code(400).send({ error: 'Informações enviadas inválidas' })
            }

        } catch (error) {
            reply.code(400).send({ error: 'Erro ao consultar empresa' })
            throw error
        }
    }

    async GetBussines(reply: FastifyReply) {
        try {

            console.log(this.mid);
            console.log(this.bussines);


            const resultSearch = await this.bussines.searchBussines()
            console.log(resultSearch);

            if (resultSearch) {
                reply.code(200).send({ send: resultSearch })

            } else {
                reply.code(400).send({ error: 'Erro ao consultar empresa' })
            }

        } catch (error) {
            reply.code(400).send({ error: 'Erro ao consultar empresa' })
            throw error
        }
    }
    UpdateBussines(param: any, reply: FastifyReply) {
        throw new Error('Method not implemented.')
    }

    Login(reply: FastifyReply) {
        throw new Error('Method not implemented.')
    }
}