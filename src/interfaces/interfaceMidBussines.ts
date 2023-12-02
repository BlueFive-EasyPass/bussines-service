
export interface IMidBussines {
    validateCompleteBussines(): boolean;
    validateLoginCredentials(): boolean
    createHash(): Promise<any>
    compareHash(hash: any): Promise<boolean>
    createToken(): Promise<string>;
}