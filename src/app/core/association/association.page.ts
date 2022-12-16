import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PaginateInterface } from "src/app/base/paginate.interface";
import DownloadFile from "src/utils/DownloadFile";
import { AssociationService } from "./association.service";
import { AssociationInterface } from "./association.interface";
import { CreateAssociationGuard } from "./guards/create.association.guard";
import { DeleteAssociationGuard } from "./guards/delete.association.guard";
import { UpdateAssociationGuard } from "./guards/update.association.guard";
import { CreateUpdateAssociationComponent } from "./components/modal-to-create-update/create-update-association.component";
import { ModalToRemoveAssociationComponent } from "./components/modal-to-remove/modal-to-remove-association.component";

@Component({
	selector: "app-association",
	templateUrl: "./association.page.html",
	styleUrls: ["./association.page.scss"]
})
export class AssociationPage implements OnInit {

	constructor(
    private associationService: AssociationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private createAssociationGuard: CreateAssociationGuard,
    private updateAssociationGuard: UpdateAssociationGuard,
    private deleteAssociationGuard: DeleteAssociationGuard,
  ) { }

  search: string = "";
  screenTitle = "Associação";
  query: Record<string, string> = {};
  showCreateItemButton: boolean = false;
  showUpdateItemButton: boolean = false;
  showDeleteItemButton: boolean = false;
  ShowDeleteItemButton: boolean = false;
  loadingTable: boolean = false;

  paginateItems: PaginateInterface<AssociationInterface> = {
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
      path: '/association',
      name: 'Associação',
    },
  ]

  headers = [
    {key: 'entityName', value: 'Nome Entidade'},
    {key: 'fantasyName', value: 'Nome Fantasia'},
    {key: 'legalForm', value: 'Forma Juridica'},
    {key: 'phone', value: 'Telefone'},
    {key: 'email', value: 'E-mail'},
    {key: 'cnpj', value: 'CNPJ'},
  ]


  ngOnInit(): void {
    this.setPermissionsScreen();
    this.setActivityRoute();
  }

  setPermissionsScreen(){
    this.createAssociationGuard.canActivate().subscribe(isAllowed => {
      this.showCreateItemButton = isAllowed;
    })

    this.updateAssociationGuard.canActivate().subscribe(isAllowed => {
      this.showUpdateItemButton = isAllowed;
    })

    this.deleteAssociationGuard.canActivate().subscribe(isAllowed => {
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
    });
  }

  getItems(){
    this.loadingTable = true;
    const { page, perPage, sortBy, sort } = this.paginateItems;

    this.associationService.getItems(
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

  openModalCreateUpdateItem(id: string, type: string){
    const item = type === "create" ? true : this.paginateItems.items.find((element => element.id === id));

    if(item){
      const modalRef = this.modalService.open(CreateUpdateAssociationComponent,{
        size: "lg",
      });

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
      const modalRef = this.modalService.open(ModalToRemoveAssociationComponent, {
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
    this.associationService.exportExcel().subscribe(response => {
      return DownloadFile(response, "Association.xlsx");
    })
  }
}
