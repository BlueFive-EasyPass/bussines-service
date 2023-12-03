export interface IBussines {
    bussinesData: {
        buss_CNPJ?: string,
        buss_nome?: string,
        buss_contato?: string,
        buss_endCEP?: string,
        buss_endUF?: string,
        buss_endrua?: string,
        buss_endnum?: string,
        buss_endcomplemento?: string,
        buss_endcidade?: string,
        buss_tipo?: string,
        buss_senha?: string,
        buss_status?: string,
        buss_endbairro?: string,
        buss_email?: string
    } | null

    imagem?: {
        data?: any
        buss_CNPJ: string,
        tipo: string
    } | null

    saveToDatabase(): any
    search(): any
    update(arg0: any): any
    loginSystem(): any
    cancel(): any
    activate(): any
    sendImage(): any
    getImage(): any
    createPassword(): any
}