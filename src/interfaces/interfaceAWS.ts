import { IBussines } from "./bussinesInterface"

export interface IAWSConfig {
    getS3Instance(): any
    sendParams(image: IBussines['imagem']): any
    getParams(image: IBussines['imagem']): any
}
