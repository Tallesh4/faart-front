import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PaginateInterface } from "src/app/base/paginate.interface";
import DownloadFile from "src/utils/DownloadFile";
import { CreateUpdateProductComponent } from "./components/create-update-product/create-update-product.component";
import { RemoveProductComponent } from "./components/remove-product/remove-product.component";
import { CreateProductGuard } from "./guards/create.product.guard";
import { DeleteProductGuard } from "./guards/delete.product.guard";
import { UpdateProductGuard } from "./guards/update.product.guard";
import { ProductInterface } from "./product.interface";
import { ProductService } from "./product.service";

@Component({
	selector: "app-product",
	templateUrl: "./product.page.html",
	styleUrls: ["./product.page.scss"]
})
export class ProductPage implements OnInit {

	constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private createProductGuard: CreateProductGuard,
    private updateProductGuard: UpdateProductGuard,
    private deleteProductGuard: DeleteProductGuard
    ) { }
    
  listIDsRemove: any[] = [];
  itemModel: ProductInterface | undefined;
  query: Record<string, string> = {};
  search: string = "";
  loadingTableItems = false;
  disabledButtonDelete = true;
  screenTitle: string = "Produtos";
  
  paginateItems: PaginateInterface<ProductInterface> = {
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
      path: '/ferramentas',
      name: 'Ferramentas',
    },
    {
      path: '/ferramentas/produto',
      name: 'Produto',
    },
    {
      path: '/ferramentas/produtos',
      name: 'Lista de Produtos',
    },
  ];

  headers = [
    {key: 'productSku', value: 'Código SKU'},
    {key: 'name', value: 'Nome'},
    {key: "categoryName", value: "Categoria"},
    {key: "brandName", value: "Marca"},
    {key: 'type', value: 'Tipo'},
    {key: 'unity', value: 'Unidade de Medida'},
  ]

  showCreateItemButton: boolean = false;
  showUpdateItemButton: boolean = false;
  ShowDeleteItemButton: boolean = false;

  ngOnInit(): void {
    this.setActivityRoute();
    this.setPermissionsScreen();
  }

  setPermissionsScreen(){
    this.createProductGuard.canActivate().subscribe(isAllowed => {
      this.showCreateItemButton = isAllowed;
    })

    this.updateProductGuard.canActivate().subscribe(isAllowed => {
      this.showUpdateItemButton = isAllowed;
    })

    this.deleteProductGuard.canActivate().subscribe(isAllowed => {
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
    this.loadingTableItems = true;
    const { page, perPage, sortBy, sort } = this.paginateItems;

    this.productService.getItems(
      page,
      perPage,
      sortBy, 
      sort,
      this.search,
      this.query
    ).subscribe(response => {
      response.items.forEach((product) => {
        product.brandName = product.brandName ? product.brandName : "Não registrado";
      })

      Object.assign(this.paginateItems, response);
      this.loadingTableItems = false;
    });
  }




  changeAmount(number: any){
    const value = parseInt(number);
    this.setNavigateQuery({
      perPage: value
    })
  }

  openModalCreateUpdateItem(id: string, type: string){
    const item = type === "create" ? true : this.paginateItems.items.find((element => element.id === id));

    if(item){
      const modalRef = this.modalService.open(CreateUpdateProductComponent,{
        size: "lg",
      });


      if(type === "update"){
        modalRef.componentInstance.updateItem = item;
      } else {
        modalRef.componentInstance.updateItem = undefined;
      }

      modalRef.result.then((result) => {
        if (result.success) {
          this.getUpdateList();
        }
      });  
    }
  }

  openModalDeleteItem(itemId: string){
    if(itemId){
      const modalRef = this.modalService.open(RemoveProductComponent, {
        size: "x1"
      });

      modalRef.componentInstance.itemID = itemId;

      modalRef.result.then((result) => {
        if(result.success){
          this.getUpdateList();
        }
      })
    }
  }

  archiveItems(enabled: boolean){
    this.loadingTableItems = true;

    this.productService.archiveItems(this.listIDsRemove, enabled).subscribe(() => {
      this.listIDsRemove = [];
      this.getItems();
    });
  }

  setArchivingItems(type: string){
    if(this.listIDsRemove.length){

      if(type === 'archive'){
        this.archiveItems(false)
      }
  
      if(type === 'restore'){
        this.archiveItems(true);
      }
    }
  }

  getUpdateList(){    
    this.paginateItems.page = 1;
    this.disabledButtonDelete = true;
    this.listIDsRemove = [];
    this.getItems();
  }

  changePage(page: number){
    this.setNavigateQuery({
      page: page
    })
  }

  sortItemsField(field: string){
    this.setNavigateQuery({
      sortBy: field,
      sort: this.paginateItems.sortBy == field ? (this.paginateItems.sort == "asc" ? "desc" : "asc") : this.paginateItems.sort
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

  exportExcel(event: boolean){
    if(event){  
      this.productService.exportExcel(
        this.search,
        this.query
      ).subscribe(response => {
        return DownloadFile(response, `Produtos.xlsx`);  
      })
    }
  }
}
