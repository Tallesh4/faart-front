import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HomeBestSellingProductChart, HomeClientChart, HomeDailyInterface, HomeMapClientInterface, HomeMapInterface, HomeMouthIndicators, HomePaymentConditionChart, HomePaymentMethodChart, HomeProductivityGraph, HomeSaleTypeChart, HomeSellerChart } from "./home.interface";

@Injectable()
export class HomeService {
	constructor(
    private http: HttpClient
  ) { }

  getDailyIndicators(): Observable<HomeDailyInterface> {
    return this.http.get<HomeDailyInterface>(`${environment.apiUrl}/home/daily-indicators`);
  }
  
  getMouthIndicators(): Observable<HomeMouthIndicators> {
    return this.http.get<HomeMouthIndicators>(`${environment.apiUrl}/home/monthly-indicators`)
  }

  getMap(): Observable<HomeMapInterface[]> {
    return this.http.get<HomeMapInterface[]>(`${environment.apiUrl}/home/map-indicator`)
  }

  getProductivityChart(year: number): Observable<HomeProductivityGraph[]> {
    return this.http.get<HomeProductivityGraph[]>(`${environment.apiUrl}/home/productivity-chart/${year}`);
  }

  getBestSellingProductChart(query: Record<string, any>): Observable<HomeBestSellingProductChart[]>{
    let url = "home/best-selling-product-chart?"

    for(let key in query){
      url += `&${key}=${query[key]}`
    }

    return this.http.get<HomeBestSellingProductChart[]>(`${environment.apiUrl}/${url}`);
  }

  getPaymentConditionChart(query: Record<string, any>): Observable<HomePaymentConditionChart[]>{
    let url = "home/best-payment-condition-chart?"

    for(let key in query){
      url += `&${key}=${query[key]}`
    }

    return this.http.get<HomePaymentConditionChart[]>(`${environment.apiUrl}/${url}`);
  }

  getPaymentMethodChart(query: Record<string, any>): Observable<HomePaymentMethodChart[]>{
    let url = "home/best-payment-method-chart?"

    for(let key in query){
      url += `&${key}=${query[key]}`
    }

    return this.http.get<HomePaymentMethodChart[]>(`${environment.apiUrl}/${url}`);
  }

  getSaleTypeChart(query: Record<string, any>): Observable<HomeSaleTypeChart[]>{
    let url = "home/best-sale-type-chart?"

    for(let key in query){
      url += `&${key}=${query[key]}`
    }

    return this.http.get<HomeSaleTypeChart[]>(`${environment.apiUrl}/${url}`);
  }

  getClientChart(query: Record<string, any>): Observable<HomeClientChart[]>{
    let url = "home/best-selling-client-chart?"

    for(let key in query){
      url += `&${key}=${query[key]}`
    }

    return this.http.get<HomeClientChart[]>(`${environment.apiUrl}/${url}`);
  }

  getSellerChart(query: Record<string, any>): Observable<HomeSellerChart[]>{
    let url = "home/best-selling-user-chart?"

    for(let key in query){
      url += `&${key}=${query[key]}`
    }

    return this.http.get<HomeSellerChart[]>(`${environment.apiUrl}/${url}`);
  }

  getClientMap(): Observable<HomeMapClientInterface[]>{
    return this.http.get<HomeMapClientInterface[]>(`${environment.apiUrl}/home/map-clients`)
  }
}
