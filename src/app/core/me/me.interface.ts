import { BaseInterface } from "src/app/base/base.interface";
import { HierarchyInterface } from "../hierarchy/hierarchy.interface";

export interface MeInterface extends BaseInterface{
    name: string,
    avatar: string | null,
    hierarchy: HierarchyInterface,
}