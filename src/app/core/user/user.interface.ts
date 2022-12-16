import { BaseInterface } from "../../base/base.interface";
import { HierarchyInterface } from "../hierarchy/hierarchy.interface";

export interface UserInterface extends BaseInterface {
    _id?: string,
    avatar?: string,
    cpf?: string,
    username: string,
    email: string,
    name: string,
    lastName?: string,
    hiredAt?: Date,
    registry?: string,
    phone?: string,
	phoneModel?: string,
	hierarchyId: string,
    addressId?: string,
    branchIds?: string[],
	appVersionId?: string,
    protheusCode?: string

    branches?: any[],
    hierarchy?: HierarchyInterface,
    address?: any,
    appVersion?: any,
}
