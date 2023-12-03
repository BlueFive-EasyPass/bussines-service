import { FastifyReply, FastifyRequest } from 'fastify';
import { Resource } from 'fastify-autoroutes';
import multer from 'fastify-multer';
import { InstanceManager } from '../../instanceManager';
import { IController } from '../../../interfaces/interfaceController';
import { IBussines } from '../../../interfaces/bussinesInterface';
import { IInstanceManager } from '../../../interfaces/interfaceInstanceManager';
const upload = multer({ dest: 'uploads/' });

export default (): Resource => ({
  post: {
    preHandler: upload.single('data'),
    handler: async (request: any, reply: FastifyReply) => {
      try {
        const data = request.file as any;
        const { buss_CNPJ } = request.body as any;
        const { tipo } = request.body as any;

        const image: IBussines['imagem'] = {
          data: data,
          buss_CNPJ: buss_CNPJ,
          tipo: tipo
        }
        if (!data || !buss_CNPJ || !tipo) {
          reply.code(400).send('Image, CNPJ e tipo são obrigatórios');
          return;
        }
        const instanceManager: IInstanceManager = new InstanceManager(null, image);
        const controller: IController = instanceManager.getController();
        console.log(data);
        console.log(controller);
        await controller.SendImage(reply)
      } catch (err) {
        console.error('Error:', err);
        reply.code(500).send('Internal Server Error');
      }
    },
  },
  get: {
    handler: async (request: any, reply: FastifyReply) => {
      const { buss_CNPJ } = request.query as any;
      const { tipo } = request.query as any;
      console.log(buss_CNPJ, tipo)
      const image: IBussines['imagem'] = {
        buss_CNPJ: buss_CNPJ,
        tipo: tipo
      }
      console.log(image);
      try {
        const instanceManager = new InstanceManager(null, image);
        const controller: IController = instanceManager.getController();
        await controller.GetImage(reply)
      } catch (err) {
        console.error('Error:', err);
        reply.code(500).send('Internal Server Error');
      }
    }
  }
})
