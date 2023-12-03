import { FastifyReply, FastifyRequest } from "fastify";
import { Resource } from 'fastify-autoroutes'
import { InstanceManager } from "../instanceManager";
import { IController } from "../../interfaces/interfaceController";
import { IBussines } from "../../interfaces/bussinesInterface";
import { IInstanceManager } from "../../interfaces/interfaceInstanceManager";

export default () => <Resource>{
    get: {
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const query: any = await request.query
            console.log(query)
            const cleanQuery = JSON.parse(JSON.stringify(query))

            console.log(cleanQuery)

            const instanceManager: IInstanceManager = new InstanceManager(cleanQuery, null)
            const controller: IController = instanceManager.getController()

            console.log(instanceManager)
            console.log(controller)


            try {
                await controller.Get(reply)
            } catch (error) {
                reply.code(500).send({ error: "Erro ao processar a requisição:" });
                throw error
            }

        }
    },

    post: {
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const bussinesData = request.body as IBussines['bussinesData']
            console.log(bussinesData);
            const instanceManager: IInstanceManager = new InstanceManager(bussinesData, null)
            const controller: IController = instanceManager.getController()

            try {
                await controller.SignUp(reply)
            } catch (error) {
                reply.code(500).send({ error: "Erro ao processar a requisição:" });
                throw error
            }
        }
    },

    put: {
        url: '/:CNPJ',
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const bussines_CNPJ = request.params as any
            const bussinesData = request.body as IBussines['bussinesData']
            const instanceManager: IInstanceManager = new InstanceManager(bussinesData, null)
            const controller: IController = instanceManager.getController()
            console.log(bussines_CNPJ);
            console.log(bussinesData)
            
            try {
                await controller.Update(bussines_CNPJ, reply)
            } catch (error) {
                reply.code(500).send({ error: "Erro ao processar a requisição:" });
                throw error
            }
        }
    }
}