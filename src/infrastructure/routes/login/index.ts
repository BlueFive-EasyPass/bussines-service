import { FastifyReply, FastifyRequest } from "fastify";
import { Resource } from 'fastify-autoroutes'
import { IBussines } from "../../../interfaces/bussinesInterface";
import { IInstanceManager } from "../../../interfaces/interfaceInstanceManager";
import { IController } from "../../../interfaces/interfaceController";
import { InstanceManager } from "../../instanceManager";

export default () => <Resource>{
    post: {
        async handler(request: FastifyRequest, reply: FastifyReply) {
            try {
                const bussinesData = request.body as IBussines['bussinesData']
                const instanceManager: IInstanceManager = new InstanceManager(bussinesData, null)
                const controller: IController = instanceManager.getController()

                await controller.Login(reply)
                
            } catch (error) {
                reply.code(500).send({ error: "Erro ao processar a requisição:" });
                throw error
            }
        }
    },

}