import bcrypt from 'bcrypt'
import * as JWT from 'jose'
import dotenv from 'dotenv'
import { IMidBussines } from '../interfaces/interfaceMidBussines';
import { IBussines } from '../interfaces/bussinesInterface';
dotenv.config()

export class MidBussines implements IMidBussines {
    private bussinesData: IBussines['bussinesData'] | any;

    constructor(bussinesData: IBussines['bussinesData']) {
        this.bussinesData = bussinesData
    }

    validateCompleteBussines(): boolean {
        console.log(this.bussinesData)

        const excludedFields: any = [
            'buss_FotoPerfil',
            'buss_endcomplemento',
            'buss_senha'
        ];

        const allRequiredFieldsPresent = Object.keys(this.bussinesData)
            .filter(field => !excludedFields.includes(field))
            .every(field => this.bussinesData !== undefined);

        console.log(allRequiredFieldsPresent);


        return allRequiredFieldsPresent;
    }

    async validateLoginCredentials(): Promise<boolean> {

        return (
            'buss_CNPJ' in this.bussinesData &&
            'buss_senha' in this.bussinesData &&
            typeof this.bussinesData['buss_CNPJ'] === 'string' &&
            typeof this.bussinesData['buss_senha'] === 'string'
        );
    }

    async createHash(): Promise<any> {

        if (this.bussinesData['buss_senha']) {

            const hash = await bcrypt.hash(this.bussinesData['buss_senha'], 10);

            return hash
        } else {
            return false
        }
    }

    async compareHash(hash: string): Promise<boolean> {

        console.log(this.bussinesData.buss_senha, hash);

        if (this.bussinesData['buss_senha']) {
            const match = await bcrypt.compare(this.bussinesData['buss_senha'], hash)
            console.log('MATCH', match);

            return match
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