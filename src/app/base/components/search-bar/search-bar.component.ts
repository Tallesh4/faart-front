import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EventEmitter } from '@angular/core';
import { formateString } from 'src/utils/SearchItems';

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  constructor() { }
  
  @Input() placeholder = "Pesquisa";
  @Input() listItems?: any = [];
  @Output() search = new EventEmitter();
  @Output() searchList = new EventEmitter();

  SearchBar = new FormGroup({
    value: new FormControl("")
  })

  ngOnInit(): void {
    
  }

  searchItem(){
    const { value } = this.SearchBar.value;
    const searchItems: any = [];

    if(this.listItems.length){
      if(!value){
        this.search.emit(undefined);
        return;
      }

      for(let itemObject of this.listItems){
        for(let key in itemObject){          
          const item = String(itemObject[key]).toLowerCase();
          const execSearch = new RegExp(`${String(value).toLocaleLowerCase()}*`, "g").exec(item);

          if(execSearch){
            if(!searchItems.includes(itemObject)){
              searchItems.push(itemObject);
            }
          }
        }
      }
    }
    
    this.search.emit(value);
    this.searchList.emit(searchItems);
  }

}
