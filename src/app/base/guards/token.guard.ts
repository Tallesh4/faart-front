import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { CryptoService } from "../services/crypto.service";

export interface Tokens {accessToken: string, refreshToken: string}

@Injectable({
	providedIn: 'root'
})
export class TokenGuard implements CanActivate {
	accessToken?: string;
	refreshToken?: string;
	constructor(
		private cryptoService: CryptoService
	) {
		const tokens = localStorage.getItem("tokens");
		try {
			if(tokens) {
				const decryptedTokens = this.cryptoService.localDecrypt<Tokens>(tokens);
				this.accessToken = decryptedTokens.accessToken;
				this.refreshToken = decryptedTokens.refreshToken;
			}
		} catch(error) {
			this.clearTokens();
		}
		this.storeTokens = this.storeTokens.bind(this);
		this.clearTokens = this.clearTokens.bind(this);
	}

	canActivate(): boolean {
		if(this.accessToken && this.refreshToken) {
			return true;
		} else {
			return false;
		}
	}

	storeTokens(tokens: Tokens) {
		const encryptedTokens = this.cryptoService.encrypt(tokens);
		localStorage.setItem("tokens", encryptedTokens);
		this.accessToken = tokens.accessToken;
		this.refreshToken = tokens.refreshToken;
	}

	clearTokens() {
		this.accessToken = undefined;
		this.refreshToken = undefined;
		localStorage.removeItem("tokens");
	}
}
