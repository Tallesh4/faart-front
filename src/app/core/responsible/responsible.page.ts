import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PaginateInterface } from "src/app/base/paginate.interface";
import DownloadFile from "src/utils/DownloadFile";
import { ResponsibleService } from "./responsible.service";
import { ResponsibleInterface } from "./responsible.interface";
import { CreateResponsibleGuard } from "./guards/create.responsible.guard";
import { DeleteResponsibleGuard } from "./guards/delete.responsible.guard";
import { UpdateResponsibleGuard } from "./guards/update.responsible.guard";
import { CreateUpdateResponsibleComponent } from "./components/modal-to-create-update/create-update-responsible.component";
import { ModalToRemoveResponsibleComponent } from "./components/modal-to-remove/modal-to-remove-responsible.component";
import { AssociationInterface } from "../association/association.interface";
import { AssociationService } from "../association/association.service";

@Component({
	selector: "app-responsible",
	templateUrl: "./responsible.page.html",
	styleUrls: ["./responsible.page.scss"]
})
export class ResponsiblePage implements OnInit {

	constructor(
    private responsibleService: ResponsibleService,
    private associationService: AssociationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private createResponsibleGuard: CreateResponsibleGuard,
    private updateResponsibleGuard: UpdateResponsibleGuard,
    private deleteResponsibleGuard: DeleteResponsibleGuard,
  ) { }

  search: string = "";
  screenTitle = "Responsáveis";
  query: Record<string, string> = {};
  associationList: AssociationInterface[] = [];
  showCreateItemButton: boolean = false;
  showUpdateItemButton: boolean = false;
  showDeleteItemButton: boolean = false;
  ShowDeleteItemButton: boolean = false;
  loadingTable: boolean = false;

  paginateItems: PaginateInterface<ResponsibleInterface> = {
    page: 1,
    perPage: 10,
    countPage: 1,
    sortBy: "createdAt",
    sort: "desc",
    total: 10,
    items: []
  };

  fastNavigationData = [
    {
      path: '/home',
      name: 'Home',
    },
    {
      path: '/responsible',
      name: 'Responsáveis',
    },
  ]

  headers = [
    {key: 'associationName', value: 'Associação'},
    {key: 'name', value: 'Nome'},
    {key: 'job', value: 'Cargo'},
    {key: 'phone', value: 'Telefone'},
    {key: 'email', value: 'E-mail'},
    {key: 'nArtisanWallet', value: 'Carteira de Artesãos'},
  ]
;

  ngOnInit(): void {
    this.setPermissionsScreen();
    this.setActivityRoute();

  }

  setPermissionsScreen(){
    this.createResponsibleGuard.canActivate().subscribe(isAllowed => {
      this.showCreateItemButton = isAllowed;
    })

    this.updateResponsibleGuard.canActivate().subscribe(isAllowed => {
      this.showUpdateItemButton = isAllowed;
    })

    this.deleteResponsibleGuard.canActivate().subscribe(isAllowed => {
      this.ShowDeleteItemButton = isAllowed;
    })
  }

  setActivityRoute(){
    this.activatedRoute.queryParams.subscribe(queryParams => {
      this.paginateItems.page = +queryParams["page"] ?? this.paginateItems.page;
      this.paginateItems.perPage = +queryParams["perPage"] ?? this.paginateItems.perPage;
      this.paginateItems.sortBy = queryParams["sortBy"] ?? this.paginateItems.sortBy;
      this.paginateItems.sort = queryParams["sort"] ?? this.paginateItems.sort;
      this.search = queryParams["search"] ?? this.search;

      this.getItems();
      this.getAssociationList()
    });
  }

  getItems(){
    this.loadingTable = true;
    const { page, perPage, sortBy, sort } = this.paginateItems;

    this.responsibleService.getItems(
      page,
      perPage,
      sortBy, 
      sort,
      this.search,
      this.query
    ).subscribe(response => {
      Object.assign(this.paginateItems, response);
      this.loadingTable = false;
    });
  }

  getAssociationList() {
    this.associationService.getAllItems().subscribe(response => {
      this.associationList = response;
    })
  }

  
  openModalCreateUpdateItem(id: string, type: string){
    const item = type === "create" ? true : this.paginateItems.items.find((element => element.id === id));

    if(item){
      const modalRef = this.modalService.open(CreateUpdateResponsibleComponent,{
        size: "lg",
      });

      modalRef.componentInstance.associationList = this.associationList;

      if(type === "update"){
        modalRef.componentInstance.itemUpdate = item;
      } else {
        modalRef.componentInstance.itemUpdate = undefined;

      }
      
      modalRef.result.then((result) => {
        if(result.success){
          this.getItems();
        }
      });  
    } 
  }

  openModalDeleteItem(itemId: string){
    if(itemId){
      const modalRef = this.modalService.open(ModalToRemoveResponsibleComponent, {
        size: "x1"
      });

      modalRef.componentInstance.itemId = itemId;

      modalRef.result.then((result) => {
          if(result.success){
            this.getItems();
          }
      })
    } 
  }

  sortItemsField(field: string){
    this.setNavigateQuery({
      sortBy: field,
      sort: this.paginateItems.sortBy == field ? (this.paginateItems.sort == "asc" ? "desc" : "asc") : this.paginateItems.sort
    })
  }

  changeAmount(number: any){
    const value = parseInt(number);
    this.setNavigateQuery({
      perPage: value
    })
  }

  setNavigateQuery(query: any){
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: query,
      queryParamsHandling: "merge"
    })
  }

  searchItem(item: string){
    this.setNavigateQuery({
      search: item
    });
  }

  changePage(page: number){
    this.setNavigateQuery({
      page: page
    })
  }

  exportExcel(event: boolean){
    this.responsibleService.exportExcel().subscribe(response => {
      return DownloadFile(response, "Responsible.xlsx");
    })
  }
}
