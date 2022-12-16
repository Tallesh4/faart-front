import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, FormsModule } from '@angular/forms';

  @Component({
    selector: 'app-generic-table',
    templateUrl: './generic-table.component.html',
    styleUrls: ['./generic-table.component.scss']
  })
  export class GenericTableComponent implements OnInit {
  
    @Input() TABLE = [];
    @Input() title = '';
    @Input() cabecalhoTable = [];
    @Input() titlemodal = ''
  
    tableItens!: any[];
    dados!: {};
  
    menuItems!: any[];
  
    breadcrumb: any = [
      {
        path: '/home',
        name: 'Home',
      },
      {
        path: '/vendas',
        name: 'Vendas Internas',
      },
      {
        path: '/vendas/wallet-clients',
        name: 'Carteira de Clintes',
      }
    ];
  
    appModal: boolean = false;
    titleGeneModal = '';
    metasModal: boolean = false;
    missionModal: boolean = false;
    execucaoModal: boolean = false;
    addPedidoModal: boolean = false;
    dadosModal: boolean = false;
    walletclient: boolean = true;
    clients_filter: any = {};
    loadingTable = false;
    notTable = false;
    optionImportModal: boolean = false;
    ClientsForm = new FormGroup({
      search: new FormControl(""),
    });
  
    item: any = {
      sort: false,
    };
  
  
    constructor() { }
  
    ngOnInit(): void {
      this.loadingTable = true
    }
  
    sortItem: any = {
      nomerazao: { sort: true },
      nomefantasia: { sort: true },
      cpnj: { sort: true },
    };
  
  
  }
  