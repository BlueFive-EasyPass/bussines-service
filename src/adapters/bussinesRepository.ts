import axios from "axios";
import { IBussines } from "../interfaces/bussinesInterface";
import { IDatabaseConnection } from "../interfaces/databaseInterface";
import { IAWSConfig } from "../interfaces/interfaceAWS";
import { IModelDB } from "../interfaces/interfaceModel";
import { IBussinesRepository } from "../interfaces/interfaceRepository";

export class BussinesRepository implements IBussinesRepository {
    private modelDB: IModelDB
    private AWS: AWS.S3
    private AWSSendParams: IAWSConfig['sendParams']
    private AWSGetParams: IAWSConfig['getParams']

    constructor(modelDB: IModelDB, AWS: IAWSConfig) {
        this.modelDB = modelDB
        this.AWS = AWS.getS3Instance()
        this.AWSSendParams = AWS.sendParams
        this.AWSGetParams = AWS.getParams
    }
   
    async cancel(bussinesData: IBussines['bussinesData']): Promise<any> {
        try {
            console.log(this.modelDB)

            const model = await this.modelDB.syncModel()
            console.log('Conexão com o banco de dados estabelecida');

            console.log(model)

            console.log(bussinesData)

            const result = await model.update({ buss_status: 'cancelado' }, {
                where: {
                    ...bussinesData
                }
            });

            console.log(result);

            if (result[0] === 1) {
                return true;
            } else {
                return false;
            }

        } catch (error) {
            console.error('Erro durante a atualização:', error);
            return false;
        } finally {
            this.modelDB.desconnectModel()
        }
    }

    async activate(bussinesData: IBussines['bussinesData']): Promise<any> {
        try {
            console.log(this.modelDB)

            const model = await this.modelDB.syncModel()
            console.log('Conexão com o banco de dados estabelecida');

            console.log(model)

            console.log(bussinesData)

            const result = await model.update({ buss_status: 'ativo' }, {
                where: {
                    ...bussinesData
                }
            });

            console.log(result);

            if (result[0] === 1) {
                return true;
            } else {
                return false;
            }

        } catch (error) {
            console.error('Erro durante a atualização:', error);
            return false;
        } finally {
            this.modelDB.desconnectModel()
        }
    }

 
    async image(image: IBussines['imagem']): Promise<boolean> {
        try {

            console.log('CHEGAMO', image);
            const params = await this.AWSSendParams(image)
            console.log(params);
            const result = await this.AWS.upload(params).promise();
            console.log(result);

            if (result) {
                return true
            } else {
                return false
            }

        } catch (error) {
            console.error('Erro ao salvar imagem:', error);
            return false;
        }
    }

    async getimage(image: IBussines['imagem']): Promise<any> {
        try {

            console.log('CHEGAMO', image);
            const params = await this.AWSGetParams(image)
            const response = await axios.get(params, { responseType: 'arraybuffer' });

            if (response && response.data) {
                return Buffer.from(response.data, 'binary');
            } else {
                return false
            }

        } catch (error) {
            console.error('Erro ao salvar imagem:', error);
            return false;
        }
    }


    async save(bussinesData: IBussines['bussinesData']): Promise<boolean> {
        try {
            const model: IDatabaseConnection['getInstance'] = await this.modelDB.syncModel()
            const resultSignUp = await model.create({
                ...bussinesData
            })

            if (resultSignUp) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.error('Erro durante o cadastro:', error);
            return false;
        } finally {
            this.modelDB.desconnectModel()
        }
    }

    async get(bussinesData: IBussines['bussinesData']): Promise<any> {
        try {
            const model: IDatabaseConnection['getInstance'] = await this.modelDB.syncModel()
            const resultUsers = await model.findAll({
                where: {
                    ...bussinesData
                }
            });

            const jsonResults = resultUsers.map((result: any) => result.toJSON());
            return jsonResults;
        } catch (error) {
            console.error('Erro durante a pesquisa:', error);
            return false;
        } finally {
            this.modelDB.desconnectModel()
        }
    }

    async update(bussinesData: IBussines['bussinesData'], param: any): Promise<any> {
        try {
            console.log(param.CNPJ);
            console.log(bussinesData)

            const model: IDatabaseConnection['getInstance'] = await this.modelDB.syncModel()
            const result = await model.update({ ...bussinesData }, {
                where: {
                    buss_CNPJ: param.CNPJ
                }
            })

            console.log(result[0]);


            if (result[0] === 1) {
                return result[0]
            } else if (result[0] > 1) {
                console.error('Erro durante a atualização: Mais de uma empresa seria atualizada');
                return false;
            } else {
                console.error('Erro durante a atualização');
                return false;
            }
        } catch (error) {
            console.error('Erro durante a atualização:', error);
            return false;
        } finally {
            this.modelDB.desconnectModel()
        }
    }

    async login(bussinesData: IBussines['bussinesData']): Promise<any> {
        try {
            const model: IDatabaseConnection['getInstance'] = await this.modelDB.syncModel()
            console.log(model);
            console.log(this.modelDB);
            
            
            const resultUsers = await model.findAll({
                where: {
                    buss_CNPJ: bussinesData?.buss_CNPJ
                }
            });

            console.log(resultUsers);
            

            const jsonResults = resultUsers.map((result: any) => result.toJSON());
            console.log(jsonResults);

            return jsonResults;
        } catch (error) {
            console.error('Erro durante a pesquisa:', error);
            return false;
        } finally {
            this.modelDB.desconnectModel()
        }
    }

    async createpassword(bussinesData: IBussines['bussinesData'] | any): Promise<any> {
        try {
            console.log(bussinesData)

            const model: IDatabaseConnection['getInstance'] = await this.modelDB.syncModel()
            const result = await model.update({ buss_senha: bussinesData.buss_senha }, {
                where: {
                    buss_CNPJ: bussinesData.buss_CNPJ
                }
            })

            console.log(result[0]);


            if (result[0] === 1) {
                return result[0]
            } else if (result[0] > 1) {
                console.error('Erro durante a atualização: Mais de uma empresa seria atualizada');
                return false;
            } else {
                console.error('Erro durante a atualização');
                return false;
            }
        } catch (error) {
            console.error('Erro durante a atualização:', error);
            return false;
        } finally {
            this.modelDB.desconnectModel()
        }
    }
}