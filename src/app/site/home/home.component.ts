import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { HomeSiteService } from "./home-site.service";

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

    constructor(private homeService: HomeSiteService) { }

    products: any[] = []
    ngOnInit(): void {
        this.homeService.getAllProducts().subscribe(response => {
            this.products = response
            console.log(response)
        }, error => {
            console.log(error)

		})
    }

}
