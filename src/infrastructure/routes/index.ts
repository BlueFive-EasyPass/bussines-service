import { FastifyReply, FastifyRequest } from "fastify";
import { Resource } from 'fastify-autoroutes'
import { InstanceManager } from "../instanceManager";
import { IController } from "../../interfaces/interfaceController";
import { IBussines } from "../../interfaces/bussinesInterface";

export default () => <Resource>{
    get: {
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const query: any = await request.query
            console.log(query)
            const cleanQuery = JSON.parse(JSON.stringify(query))

            console.log(cleanQuery)

            const instanceManager = new InstanceManager(cleanQuery)
            const controller: IController = instanceManager.getController()

            console.log(instanceManager)
            console.log(controller)


            try {
                await controller.GetBussines(reply)
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
            const instanceManager = new InstanceManager(bussinesData)
            const controller: IController = instanceManager.getController()

            try {
                await controller.SignUp(reply)
            } catch (error) {
                reply.code(500).send({ error: "Erro ao processar a requisição:" });
                throw error
            }
        }
    }
}