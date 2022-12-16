import { BaseInterface } from "src/app/base/base.interface";
import { AddressInterface } from "../address/address.interface";

export interface RegistrationFormInterface extends BaseInterface{
    entityName?: string;
    fantasyName?: string;
    legalForm?: string;
    addressAssociation?: AddressInterface,
    phoneAssociation?: string;
    emailAssociation?: string;
    cnpjAssociation?: string;

    name: string;
    job?: string;
    addressResponsible?: AddressInterface,
    cpf?: string;
    email?: string;
    phone?: string;
    dateFiliation?: any;
    rg?: string;
    bodyExpeditor?: string;
    maritalStatus?: string;
    naturalness?: string;
    nationality?: string;
    nArtisanWallet?: string;
    dueDateArtisanWallet?: any;
}