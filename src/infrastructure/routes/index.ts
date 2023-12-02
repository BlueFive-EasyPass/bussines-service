import { FastifyReply, FastifyRequest } from "fastify";
import { Resource } from 'fastify-autoroutes'
import { InstanceManager } from "../instanceManager";
import { IController } from "../../interfaces/interfaceController";

export default () => <Resource>{
    get: {
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const query = request.query as any
            const instanceManager = new InstanceManager(query)
            const controller: IController = instanceManager.getController()
            console.log(query)

            try {
                await controller.GetBussines(reply)
            } catch (error) {
                reply.code(500).send({ error: "Erro ao processar a requisição:" });
                throw error
            }

        }
    }
}