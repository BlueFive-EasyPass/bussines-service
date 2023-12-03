import { FastifyReply, FastifyRequest } from "fastify";
import { Resource } from 'fastify-autoroutes'
import { IBussines } from "../../../interfaces/bussinesInterface";
import { IInstanceManager } from "../../../interfaces/interfaceInstanceManager";
import { IController } from "../../../interfaces/interfaceController";
import { InstanceManager } from "../../instanceManager";
import { IMidBussines } from "../../../interfaces/interfaceMidBussines";
import { MidBussines } from "../../../application/midBussines";

export default () => <Resource>{
    patch: {
        async handler(request: FastifyRequest, reply: FastifyReply) {
            try {
                const bussinesData = request.body as IBussines['bussinesData']
                const mid: IMidBussines = new MidBussines(bussinesData)
                const createHash: string = await mid.createHash()

                console.log(bussinesData);
                console.log(mid);
                console.log(createHash);                
    
                const bussinesDataWithHash = {
                    ...bussinesData,
                    buss_senha: createHash
                }
                console.log(bussinesDataWithHash);

                const instanceManager: IInstanceManager = new InstanceManager(bussinesDataWithHash, null)
                const controller: IController = instanceManager.getController()
                console.log(instanceManager);
                console.log(controller);

                await controller.CreatePassword(reply)
                
            } catch (error) {
                reply.code(500).send({ error: "Erro ao processar a requisição" });
                throw error
            }
        }
    },

}