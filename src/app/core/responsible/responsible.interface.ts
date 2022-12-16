import { BaseInterface } from "src/app/base/base.interface";

export interface ResponsibleInterface extends BaseInterface{
    associationId?: any;
    associationName: string;
    name: string;
    job: string;
    addressId?: any,
    address?: any,
    cpf: string;
    email: string;
    phone: string;
    dateFiliation: any;
    rg: string;
    bodyExpeditor: string;
    maritalStatus: string;
    naturalness: string;
    nationality: string;
    nArtisanWallet: string;
    dueDateArtisanWallet: any;
}