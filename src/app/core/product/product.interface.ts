import { BaseInterface } from "src/app/base/base.interface";

export interface ProductInterface extends BaseInterface{
    _id?: string,
    name: string,
    brandId: string,
    categoryId: string,
    subCategoryId: string
    brand: any,
    category: any,
    subCategory: any,
    barCode: string,
    boxCode: string,
    type: string,
    unity: string,
    protheusCode: string,
    images?: [{
        type: string,
        url: string
    }],
    soldAmount?: number,
    brandName?: string
}
