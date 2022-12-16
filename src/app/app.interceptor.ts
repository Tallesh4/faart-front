import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { from, Observable, of, throwError } from "rxjs";
import { catchError, map, retry, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { CryptoService } from "./base/services/crypto.service";
import { TokenGuard, Tokens } from "./base/guards/token.guard";
import { MeService } from "./core/me/me.service";
import { BaseService } from "./base/base.service";

@Injectable({
	providedIn: "root"
})
export class AppInterceptor implements HttpInterceptor {
	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private cryptoService: CryptoService,
		private tokenGuard: TokenGuard,
		private meService: MeService,
		private toastr: BaseService,
	) { }
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if(!req.headers.has("x-api-token")) {
			req = req.clone({headers: req.headers.append("x-api-token", environment.apiToken)});
		}

		if(!req.headers.has("Authorization") && this.tokenGuard.accessToken) {
			req= req.clone({headers: req.headers.append("Authorization", "Bearer " + this.tokenGuard.accessToken)})
		}

		if(req.body) {
			req = req.clone({body: this.cryptoService.encrypt(req.body, !(req.body instanceof FormData))});
		}

		req = req.clone({withCredentials: true});

		if(req.responseType === 'json'){
			req = req.clone({responseType: "text"});

			return next.handle(req).pipe(
				map(event => this.decryptResponseHandler(event)),
				catchError(error => this.errorResponseHandler(error, req, next))
			);
		}

		if(req.responseType === 'blob'){
			req = req.clone({responseType: "blob"});			
		}

		return next.handle(req).pipe(
			catchError(error => this.errorResponseHandler(error, req, next))
		);
	}

	errorResponseHandler(error: HttpErrorResponse, req: HttpRequest<any>, next: HttpHandler) {
		error = this.decryptErrorResponse(error);
		if(error.status == 401) {
			this.router.navigate(["/login"], {
				queryParams: {
					message: error.error.message,
					redirectTo: window.location.href
				}
			})

			if(this.tokenGuard.refreshToken) {
				return this.getRefreshToken().pipe(
					switchMap(() => {
						req = req.clone({setHeaders: {"Authorization": "Bearer " + this.tokenGuard.accessToken}});
						return next.handle(req);
					}),
					map(event => this.decryptResponseHandler(event)),
					catchError((errorRefreshToken: HttpErrorResponse) => {
						let decryptedError = this.decryptErrorResponse(errorRefreshToken);
						if(errorRefreshToken.status == 401) {
							this.tokenGuard.clearTokens();
							this.router.navigate(["/login"], {
								queryParams: {
									redirectTo: window.location.href,
									message: decryptedError.error.message
								}
							});
						}
						return throwError(decryptedError);
					})
				);
			} else {
				this.router.navigate(["/login"], {
					queryParams: {
						message: error.error.message,
						redirectTo: window.location.href
					}
				})
			}
		}
		if(error.status == 0) {
			error = this.decryptErrorResponse(error, {
				message: "Server connection is missing"
			});
		}
		if(error.status == 400) {
			if(!error.error.errors) alert(error.error.message);
		}
		return throwError(error);
	}
	decryptResponseHandler(event: any) {
		if(event instanceof HttpResponse) {
			return event.clone({body: this.cryptoService.decrypt(event.body)});
		}
		return event;
	}

	getRefreshToken(): Observable<any> {
		return new Observable(observer => {
			let observable = this.meService.refreshToken(this.tokenGuard.refreshToken || "");

			return observable.subscribe(tokens => {
				this.tokenGuard.storeTokens(tokens);
				observer.next();
				observer.complete();
			});
		})
	}
	decryptErrorResponse(error: HttpErrorResponse, errorBody?: unknown) {
		try {
			return new HttpErrorResponse({
				error: errorBody ?? JSON.parse(this.cryptoService.decrypt(error.error)),
				headers: error.headers,
				status: error.status,
				statusText: error.statusText,
				url: error.url || undefined,
			});
		} catch {
			return error;
		}
	}

}
