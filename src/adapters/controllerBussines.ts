import dotenv from 'dotenv'
import { IBussines } from '../interfaces/bussinesInterface'
import { FastifyReply, FastifySchema, FastifyTypeProviderDefault, RawServerDefault, RouteGenericInterface } from 'fastify'
import { IMidBussines } from '../interfaces/interfaceMidBussines'
import { IController } from '../interfaces/interfaceController'
import { IncomingMessage, ServerResponse } from 'http'

dotenv.config()

export class BussinesController implements IController {
    private bussines: IBussines
    private mid: IMidBussines

    constructor(bussinesData: IBussines, mid: IMidBussines) {
        this.bussines = bussinesData
        this.mid = mid
    }

    async Cancel(reply: FastifyReply) {
        console.log(this.bussines);

        try {
            const result = await this.bussines.cancel()
            console.log(result);
            console.log(result);


            if (result) {
                reply.code(200).send({ send: `Usuário: ${this.bussines.bussinesData?.buss_CNPJ}, foi cancelado` })
            } else {
                reply.code(400).send({ error: 'Erro ao cancelar usuário' })
            }

        } catch (error) {
            return reply.code(500).send({ error: "Erro ao processar a requisição:" })
        }
    }

    async Activate(reply: FastifyReply) {
        console.log(this.bussines);

        try {
            const result = await this.bussines.activate()
            console.log(result);
            console.log(result);


            if (result) {
                reply.code(200).send({ send: `Usuário: ${this.bussines.bussinesData?.buss_CNPJ}, foi ativo` })
            } else {
                reply.code(400).send({ error: 'Erro ao ativar usuário' })
            }

        } catch (error) {
            return reply.code(500).send({ error: "Erro ao processar a requisição:" })
        }
    }


    async SendImage(reply: FastifyReply) {
        try {
            const result = await this.bussines.sendImage()

            if (result) {
                reply.code(200).send({ send: 'FOI MLK' });
            }
        } catch (error) {
            reply.code(400).send({ error: "Erro ao salvar imagem:" });
        }
    }

    async GetImage(reply: FastifyReply) {
        try {
            const result: Buffer = await this.bussines.getImage()

            if (result) {
                reply.code(200).send({ send: result });
            }
        } catch (error) {
            reply.code(400).send({ error: "Erro ao salvar imagem:" });
        }
    }
    
    async SignUp(reply: FastifyReply) {
        try {
            const resultFields = this.mid.validateCompleteBussines()
            const resultSignUp = await this.bussines.saveToDatabase()

            if (resultFields && resultSignUp) {
                reply.code(200).send({ send: 'Cadastrado com sucesso' })
            } else if (resultFields) {
                reply.code(400).send({ error: 'Erro ao consultar empresa' })
            } else {
                reply.code(400).send({ error: 'Informações enviadas inválidas' })
            }

        } catch (error) {
            reply.code(400).send({ error: 'Erro ao consultar empresa' })
            throw error
        }
    }

    async Get(reply: FastifyReply) {
        try {

            console.log(this.mid);
            console.log(this.bussines);


            const resultSearch = await this.bussines.search()
            console.log(resultSearch);

            if (resultSearch) {
                reply.code(200).send({ send: resultSearch })

            } else {
                reply.code(400).send({ error: 'Erro ao consultar empresa' })
            }

        } catch (error) {
            reply.code(400).send({ error: 'Erro ao consultar empresa' })
            throw error
        }
    }

    async Update(param: any, reply: FastifyReply) {
        try {
            const resultUpdate = await this.bussines.update(param)

            if (resultUpdate === 1) {
                reply.code(200).send({ send: `Empresa ${param.CNPJ} foi alterada.` })
            } else {
                reply.code(400).send({ error: 'Erro ao atualizar empresa' })
            }
        } catch (error) {
            reply.code(400).send({ error: 'Erro ao atualizar empresa' })
            throw error
        }
    }

    async Login(reply: FastifyReply) {

        try {
            console.log(this.bussines);

            const resultVerify = await this.mid.validateLoginCredentials()

            if (!resultVerify) {
                return reply.code(400).send({ error: "Credenciais inválidas" });
            } else {
                const result = await this.bussines.loginSystem()
                console.log('CONTROLLER', result[0]);


                if (!result[0]) {
                    return reply.code(400).send({ error: "CPF ou senha inválidos" });
                } else {

                    console.log(result[0].buss_senha)

                    const compare = await this.mid.compareHash(result[0].buss_senha)

                    console.log(compare);


                    if (compare) {
                        const token = await this.mid.createToken()
                        console.log('token: ', token);

                        const currentDate = new Date();
                        const expiresData = new Date();
                        expiresData.setDate(currentDate.getDate() + 7);

                        reply.setCookie('token', token, {
                            secure: true,
                            httpOnly: true,
                            sameSite: 'strict',
                            expires: expiresData
                        });

                        return reply.code(200).send({ send: 'Logado' });
                    } else {
                        return reply.code(400).send({ error: "Erro ao logar na conta:" });
                    }
                }
            }

        } catch (error) {
            return reply.code(500).send({ error: "Erro ao processar a requisição:" });
        }
    }

    async CreatePassword(reply: FastifyReply) {
        try {
            const result = await this.bussines.createPassword()

            if (result) {
                return reply.code(200).send({ send: 'Senha criada com sucesso' });
            } else {
                return reply.code(400).send({ error: "Erro ao criar senha" });
            }

        } catch (error) {
            return reply.code(500).send({ error: "Erro ao processar a requisição:" });
        }
    }
}