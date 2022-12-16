import { NgModule } from "@angular/core";
import { UserService } from "../user/user.service";
import { SplashRoutingModule } from "./splash-routing.module";
import { SplashPage } from "./splash.page";
import { SplashService } from "./splash.service";

@NgModule({
  declarations: [SplashPage],
  imports: [SplashRoutingModule],
  exports: [SplashPage],
  providers: [SplashService, UserService]
})
export class SplashModule { }
