import { BaseInterface } from "src/app/base/base.interface";

export interface VerifyInterface extends BaseInterface {
	token?: string,
	expireAt?: Date,
}
