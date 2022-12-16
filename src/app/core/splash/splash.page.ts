import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MeService } from "src/app/core/me/me.service";
import { MeInterface } from "../me/me.interface";
import { UserService } from "../user/user.service";

@Component({
  selector: "app-splash",
  templateUrl: "./splash.page.html",
  styleUrls: ["./splash.page.scss"]
})
export class SplashPage implements OnInit {

  constructor(
    private meService: MeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.meService.getMe().subscribe(response => {
      this.setLocalStorage(response);
    })
  }

  setLocalStorage(response: MeInterface) {
    const storageSave = {
      name: response.name,
      avatar: response.avatar,
      hierarchy: response.hierarchy.name,
      id: response.id
    }

    localStorage.setItem("user", JSON.stringify(storageSave))

    const userData = localStorage.getItem("user");

    if (userData) {
      this.router.navigate(['/home'])
    }
  }
}
