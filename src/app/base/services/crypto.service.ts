import { Injectable } from "@angular/core";
import * as crypto from "crypto-js";
import { environment } from "src/environments/environment";
import { Buffer } from "buffer";

@Injectable({
	providedIn: "root"
})
export class CryptoService {
	iv;
	constructor() {
		this.iv = Buffer.alloc(16, 0).toString();
	}

	encrypt(data: any, json: boolean = true): string | any {
		if(data && json) {
			const encryptedData = crypto.AES.encrypt(JSON.stringify(data), environment.encryptSecret);
			return encryptedData.toString();
		}
		return data;
	}

	decrypt<Type>(hash: string): Type {
		const decryptedData = crypto.AES.decrypt(hash, environment.decryptSecret);
		return JSON.parse(decryptedData.toString(crypto.enc.Utf8));
	}

	localDecrypt<Type>(hash: string): Type {
		const decryptedData = crypto.AES.decrypt(hash, environment.encryptSecret);
		return JSON.parse(decryptedData.toString(crypto.enc.Utf8));
	}
}
