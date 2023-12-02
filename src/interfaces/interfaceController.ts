import { FastifyReply } from "fastify"

export interface IController {
    SignUp(reply: FastifyReply): any
    GetBussines(reply: FastifyReply): any
    UpdateBussines(arg0: any, reply: FastifyReply): any
    Login(reply: FastifyReply): any
}