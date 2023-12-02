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

    constructor(bussinesData: IBussines) {
        this.bussines = bussinesData
        this.mid = new MidBussines(this.bussines)
    }

    SignUp(reply: FastifyReply) {
        throw new Error('Method not implemented.')
    }

    async GetBussines(reply: FastifyReply) {
        try {
            const resultSearch = await this.bussines.searchBussines()

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