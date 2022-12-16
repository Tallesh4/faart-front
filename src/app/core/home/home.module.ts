import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BaseModule } from "src/app/base/base.module";
import { HomeRoutingModule } from "./home-routing.module";
import { HomePage } from "./home.page";
import { HomeService } from "./home.service";
import { CardHomeComponent } from './components/card-home/card-home.component';
import { AgmCoreModule } from "@agm/core";
import { AgmOverlays } from 'agm-overlays';
import { HomeMapComponent } from './components/home-map/home-map.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ChartHeaderComponent } from './components/chart-header/chart-header.component';
import { HomeChartContainerComponent } from './components/home-chart-container/home-chart-container.component';
import { CardIndicatorsComponent } from './components/card-indicators/card-indicators.component';

@NgModule({
  declarations: [HomePage, CardHomeComponent, HomeMapComponent, ChartHeaderComponent, HomeChartContainerComponent, CardIndicatorsComponent],
  imports: [
    HomeRoutingModule,
    BaseModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAB3sd8hSP8jNeFJTsPSPNkdy149KA-dfA'
    }),
    AgmOverlays,
    ReactiveFormsModule
  ],
  exports: [HomePage,CardIndicatorsComponent],
  providers: [HomeService]
})
export class HomeModule { }
