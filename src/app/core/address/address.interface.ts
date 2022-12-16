import { BaseInterface } from "../../base/base.interface";

export interface AddressInterface extends BaseInterface {
    number: string,
    street: string,
    zipCode: string,
    complement?: string,
    lat?: number,
    lng?: number,
    cityId: string,

    city?: any,
    state?: any
}