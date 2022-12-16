import { BaseInterface } from "src/app/base/base.interface";
import { AddressInterface } from "../address/address.interface";

export interface AssociationInterface extends BaseInterface{
    entityName: string;
    fantasyName: string;
    legalForm: string;
    phone: string;
    email: string;
    cnpj: string;

    address?:AddressInterface
}