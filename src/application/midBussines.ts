import bcrypt from 'bcrypt'
import * as JWT from 'jose'
import dotenv from 'dotenv'
import { IMidBussines } from '../interfaces/interfaceMidBussines';
import { IBussines } from '../interfaces/bussinesInterface';
dotenv.config()

export class MidBussines implements IMidBussines {
    private bussinesData: any;

    constructor(bussinesData: IBussines){
        this.bussinesData = bussinesData
    }

    validateCompleteBussines(): boolean {
        console.log(this.bussinesData)

        const excludedFields: string[] = [
            'buss_FotoPerfil',
            'buss_endcomplemento',
            'buss_senha'
        ];

        const allRequiredFieldsPresent = Object.keys(this.bussinesData)
            .filter(field => !excludedFields.includes(field))
            .every(field => this.bussinesData[field] !== undefined);

            console.log(allRequiredFieldsPresent);


        return allRequiredFieldsPresent;
    }

    validateLoginCredentials(): boolean {
        return (
            'buss_CNPJ' in this.bussinesData &&
            'buss_senha' in this.bussinesData &&
            typeof this.bussinesData.user_CPF === 'string' &&
            typeof this.bussinesData.user_senha === 'string'
        );
    }

    async createHash(): Promise<any> {
        const hash = await bcrypt.hash(this.bussinesData.user_senha, 10);

        return hash
    }

    async compareHash(hash: any): Promise<boolean> {

        const match = await bcrypt.compare(this.bussinesData.bussinesData.user_senha, hash)

        if (match) {
            return true
        } else {
            return false
        }
    }

    async createToken(): Promise<string> {
        const secret = new TextEncoder().encode(
            'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
          )
          const alg = 'HS256'
          
          const jwt: string = await new JWT.SignJWT({ 'urn:example:claim': true })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setIssuer('urn:example:issuer')
            .setAudience('urn:example:audience')
            .setExpirationTime('7d')
            .sign(secret)
          

        return jwt
    }

}