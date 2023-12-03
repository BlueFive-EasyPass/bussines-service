import { FastifyReply } from "fastify"

export interface IController {
    SignUp(reply: FastifyReply): any
    Get(reply: FastifyReply): any
    Update(arg0: any, reply: FastifyReply): any
    Login(reply: FastifyReply): any
    Cancel(reply: FastifyReply): any
    Activate(reply: FastifyReply): any
    SendImage(reply: FastifyReply): any
    GetImage(reply: FastifyReply): any
    CreatePassword(reply: FastifyReply): any
}