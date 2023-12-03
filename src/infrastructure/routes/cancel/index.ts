import { FastifyReply, FastifyRequest } from 'fastify'
import { Resource } from 'fastify-autoroutes'
import { IController } from '../../../interfaces/interfaceController'
import { InstanceManager } from '../../instanceManager'
import { IBussines } from '../../../interfaces/bussinesInterface'

export default () => <Resource>{
    patch: {
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            const bussinesData = request.body as IBussines['bussinesData'];

            const instanceManager = new InstanceManager(bussinesData, null);
            const controller: IController = instanceManager.getController();

            try {
                await controller.Cancel(reply)
            } catch (error) {
                reply.code(500).send({ error: "Erro ao processar requisção" })
            }
        }
    }
}
