export interface IBussines {
    bussinesData: {
        buss_CNPJ: string | null,
        buss_nome: string | null,
        buss_contato: string | null,
        buss_endCEP: string | null,
        buss_endUF: string | null,
        buss_endrua: string | null,
        buss_endnum: string | null,
        buss_endcomplemento: string | null,
        buss_endcidade: string | null,
        buss_tipo: string | null,
        buss_senha: string | null,
        buss_status: string | null,
        buss_endbairro: string | null,
        buss_email: string | null
    }

    saveToDatabase(): any
    searchBussines(): any
    updateBussines(arg0: any): any
    loginSystem(): any
}