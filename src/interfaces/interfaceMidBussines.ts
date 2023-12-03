
export interface IMidBussines {
    validateCompleteBussines(): boolean;
    validateLoginCredentials(): Promise<boolean>
    createHash(): Promise<any>
    compareHash(hash: any): Promise<any>
    createToken(): Promise<string>;
}