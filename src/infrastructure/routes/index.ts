import { FastifyReply, FastifyRequest } from "fastify";
import { Resource } from 'fastify-autoroutes'

export default () => <Resource>{
    get: {
        handler: async (request: FastifyRequest, reply: FastifyReply) => {
            reply.code(200).send({ send: 'Foi' })
        }
    }
}