import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MainLayoutComponent } from "./components/main-layout/main-layout.component";
import { NavComponent } from "./components/nav/nav.component";
import { MainMenuComponent } from './components/nav/components/main-menu/main-menu.component';
import { SubMenuOptionsComponent } from './components/nav/components/sub-menu-options/sub-menu-options.component';
import { NavbarMenuComponent } from './components/nav/components/navbar-menu/navbar-menu.component';
import { CardToolsComponent } from "./components/nav/components/card-tools/card-tools.component";
import { FastNavigationComponent } from "./components/fast-navigation/fast-navigation.component";
import { ModalComponent } from "./components/modal/modal.component";
import { LoadingDefaultTabletComponent } from './components/loading-default-table/loading-default-table.component';
import { LoadingCircleComponent } from './components/loading-circle/loading-circle.component';
import { NgxSkeletonLoaderModule } from "ngx-skeleton-loader";
import { StandardToolbarComponent } from './components/standard-toolbar/standard-toolbar.component';
import { StandardTableToolsComponent } from './components/standard-table-tools/standard-table-tools.component'
import { NgxPaginationModule } from "ngx-pagination";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ServerSearchBarComponent } from "./components/server-search-bar/server-search-bar.component";
import { AppInterceptor } from "../app.interceptor";
import { SelectorWithListAndSearchComponent } from './components/selector-with-list-and-search/selector-with-list-and-search.component';
import { ListWithSearchComponent } from './components/list-with-search/list-with-search.component';
import { ButtonToggleStatusComponent } from "./components/button-toggle-status/button-toggle-status.component";
import { InputCustomComponent } from './components/input-custom/input-custom.component';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import { QuantityAmountComponent } from './components/quantity-amount/quantity-amount.component';
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { HeaderDefaultIndicatorComponent } from "./components/header-default-indicator/header-default-indicator.component";
import { FilterComponent } from "./components/filter/filter.component";
import { FilterService } from "./components/filter/filter.service";
import { ItemFilterComponent } from './components/filter/components/item-filter/item-filter.component';
import { StandardTableReportComponent } from './components/standard-table-report/standard-table-report.component';
import { DefaultExportButtonComponent } from './components/default-export-button/default-export-button.component';
import { SimpleBarGraphComponent } from './components/simple-bar-graph/simple-bar-graph.component';
import { NgChartsModule } from "ng2-charts";
import { DropFileInputComponent } from "./components/drop-file-input/drop-file-input.component";
import { PageTitleComponent } from './components/page-title/page-title.component';
import { TablePaginatorComponent } from "./components/table-paginator/table-paginator.component";
import { ToolMenuComponent } from './components/tool-menu/tool-menu.component';
import { CardVisitDetailComponent } from "./components/card-visit-detail/card-visit-detail.component";
import { LoadingCustomComponent } from "./components/loading-custom/loading-custom.component";
import { InputMultipleSelectComponent } from "./components/input-multiple-select/input-multiple-select.component";
import { CardDefaultIndicatorsComponent } from './components/card-default-indicators/card-default-indicators.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddressService } from "../core/address/address.service";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    NgxSkeletonLoaderModule,
    NgxPaginationModule,
    NgbModule,
    ReactiveFormsModule,
    NgChartsModule,
    MatSnackBarModule
  ],
  declarations: [
    MainLayoutComponent,
    NavComponent,
    MainMenuComponent,
    SubMenuOptionsComponent,
    NavbarMenuComponent,
    CardToolsComponent,
    FastNavigationComponent,
    ModalComponent,
    LoadingDefaultTabletComponent,
    LoadingCircleComponent,
    StandardToolbarComponent,
    StandardTableToolsComponent,
    ServerSearchBarComponent,
    SelectorWithListAndSearchComponent,
    ListWithSearchComponent,
    ButtonToggleStatusComponent,
    InputCustomComponent,
    GenericTableComponent,
    SearchBarComponent,
    QuantityAmountComponent,
    HeaderDefaultIndicatorComponent,
    FilterComponent,
    ItemFilterComponent,
    StandardTableReportComponent,
    TablePaginatorComponent,
    DefaultExportButtonComponent,
    SimpleBarGraphComponent,
    DropFileInputComponent,
    PageTitleComponent,
    ToolMenuComponent,
    CardVisitDetailComponent,
    LoadingCustomComponent,
    InputMultipleSelectComponent,
    CardDefaultIndicatorsComponent
  ],
  exports: [
    MainLayoutComponent,
    NavComponent,
    MainMenuComponent,
    SubMenuOptionsComponent,
    NavbarMenuComponent,
    CardToolsComponent,
    FastNavigationComponent,
    ModalComponent,
    LoadingDefaultTabletComponent,
    LoadingCircleComponent,
    StandardToolbarComponent,
    StandardTableToolsComponent,
    ServerSearchBarComponent,
    SelectorWithListAndSearchComponent,
    ListWithSearchComponent,
    ButtonToggleStatusComponent,
    InputCustomComponent,
    SearchBarComponent,
    QuantityAmountComponent,
    HeaderDefaultIndicatorComponent,
    FilterComponent,
    StandardTableReportComponent,
    TablePaginatorComponent,
    DefaultExportButtonComponent,
    SimpleBarGraphComponent,
    DropFileInputComponent,
    PageTitleComponent,
    ToolMenuComponent,
    CardVisitDetailComponent,
    LoadingCustomComponent,
    InputMultipleSelectComponent,
    CardDefaultIndicatorsComponent
  ],
  providers: [
    AppInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    FilterService,
    AddressService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BaseModule { }
