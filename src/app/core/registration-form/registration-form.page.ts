import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PaginateInterface } from "src/app/base/paginate.interface";
import DownloadFile from "src/utils/DownloadFile";
import { RegistrationFormService } from "./registration-form.service";
import { RegistrationFormInterface } from "./registration-form.interface";
import { CreateRegistrationFormGuard } from "./guards/create.registration-form.guard";
import { DeleteRegistrationFormGuard } from "./guards/delete.registration-form.guard";
import { UpdateRegistrationFormGuard } from "./guards/update.registration-form.guard";
import { CreateUpdateRegistrationFormComponent } from "./components/modal-to-create-update/create-update-registration-form.component";
import { ModalToRemoveRegistrationFormComponent } from "./components/modal-to-remove/modal-to-remove-registration-form.component";

@Component({
	selector: "app-registration-form",
	templateUrl: "./registration-form.page.html",
	styleUrls: ["./registration-form.page.scss"]
})
export class RegistrationFormPage implements OnInit {

	constructor(
    private registrationFormService: RegistrationFormService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private createRegistrationFormGuard: CreateRegistrationFormGuard,
    private updateRegistrationFormGuard: UpdateRegistrationFormGuard,
    private deleteRegistrationFormGuard: DeleteRegistrationFormGuard,
  ) { }

  search: string = "";
  screenTitle = "Fichas Cadastrais";
  query: Record<string, string> = {};
  showCreateItemButton: boolean = false;
  showUpdateItemButton: boolean = false;
  showDeleteItemButton: boolean = false;
  ShowDeleteItemButton: boolean = false;
  loadingTable: boolean = false;

  paginateItems: PaginateInterface<RegistrationFormInterface> = {
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
      path: '/registration-form',
      name: 'Fichas Cadastrais',
    },
  ]

  headers = [
    {key: 'fantasyName', value: 'Nome Fantasia Associação'},
    {key: 'legalForm', value: 'Forma Jurídica Associação'},
    {key: 'emailAssociation', value: 'Email Associação'},
    {key: 'name', value: 'Nome Responsável'},
    {key: 'job', value: 'Cargo Responsável'},
    {key: 'phone', value: 'Telefone Responsável'},
  ]

  ngOnInit(): void {
    this.setPermissionsScreen();
    this.setActivityRoute();
  }

  setPermissionsScreen(){
    this.createRegistrationFormGuard.canActivate().subscribe(isAllowed => {
      this.showCreateItemButton = isAllowed;
    })

    this.updateRegistrationFormGuard.canActivate().subscribe(isAllowed => {
      this.showUpdateItemButton = isAllowed;
    })

    this.deleteRegistrationFormGuard.canActivate().subscribe(isAllowed => {
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

    this.registrationFormService.getItems(
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

  openModalCreateUpdateItem(id: string){
    const item = this.paginateItems.items.find((element => element.id === id));
    
    if(item){
      const modalRef = this.modalService.open(CreateUpdateRegistrationFormComponent,{
        size: "lg",
      });
      
      modalRef.componentInstance.itemUpdate = item;
      
      console.log(item)
      
      modalRef.result.then((result) => {
        if(result.success){
          this.getItems();
        }
      });  
    } 
  }

  openModalDeleteItem(itemId: string){
    if(itemId){
      const modalRef = this.modalService.open(ModalToRemoveRegistrationFormComponent, {
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
    this.registrationFormService.exportExcel().subscribe(response => {
      return DownloadFile(response, "RegistrationForm.xlsx");
    })
  }
}
