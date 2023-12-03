import path from 'path';
import AWS from 'aws-sdk';
import fs from 'fs'; import dotenv from 'dotenv'
import { IAWSConfig } from '../interfaces/interfaceAWS';
import { IBussines } from '../interfaces/bussinesInterface';
dotenv.config()

export class AWSS3Config implements IAWSConfig {
    private readonly accessKeyId: string;
    private readonly secretAccessKey: string;

    constructor() {
        this.accessKeyId = process.env.accesskeyaws as string;
        this.secretAccessKey = process.env.secretkeyaws as string;
    }

    private configureAWS(): void {
        AWS.config.update({
            accessKeyId: this.accessKeyId,
            secretAccessKey: this.secretAccessKey,
        });
    }

    sendParams(image: IBussines['imagem']): any {
        const ext = path.extname(image?.data.originalname);
        const fileContent = fs.readFileSync(image?.data.path);

        const params = {
            Bucket: 'bluefive/easypass/bussines',
            Key: `${image?.buss_CNPJ}/${image?.tipo}${ext}`,
            Body: fileContent
        };

        return params
    }

    getParams(image: IBussines['imagem']): any {
        const params = `https://bluefive.s3.us-west-1.amazonaws.com/easypass/bussines/${image?.buss_CNPJ}/${image?.tipo}.png` 
        return params
    }

    getS3Instance(): AWS.S3 {
        this.configureAWS();
        console.log('AWS Configurada')
        return new AWS.S3();
    }
}

