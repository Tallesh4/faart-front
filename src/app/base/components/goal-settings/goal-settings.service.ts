import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { GoalSettingsInterface, GoalsInterface, GoalSuggestionsInterface } from "./goal-settings.interface";

@Injectable()
export class GlobalGoalSettingsService {

    route = "";

    constructor(
        private http: HttpClient
    ) { }

    private getHeader(): any {
        const headers = new HttpHeaders({
            "x-api-token": environment.apiToken
        });

        return headers;
    }

    setRoute(route:string){
        this.route = route;
    }

    getGoalSuggestions(): Observable<GoalSuggestionsInterface[]> {

        let url = `${environment.apiUrl}/goal-suggestions`;

        return this.http.get<GoalSuggestionsInterface[]>(url, { headers: this.getHeader() });

    }

    sendGoal(props: GoalsInterface): Observable<GoalsInterface> {

        let url = `${environment.apiUrl}/${this.route}`;

        console.log(url);

        return this.http.post<GoalsInterface>(url, props, { headers: this.getHeader() });

    }
}