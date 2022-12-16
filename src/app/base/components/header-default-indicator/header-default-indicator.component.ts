import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'header-default-indicator',
  templateUrl: './header-default-indicator.component.html',
  styleUrls: ['./header-default-indicator.component.scss']
})
export class HeaderDefaultIndicatorComponent implements OnInit{

  @Input() title: String = "";
  @Input() value: any;
  @Input() loadingHeader: boolean = false;
  @Input() subTitle?: string = "";
  @Input() subValue?: string = "";

  listItemsWithTitle: any = [];

  constructor() { }

  ngOnInit(): void {
    if(typeof this.value === 'object'){
      this.value.forEach((item: any) => {
        const subTitle = item[this.subTitle!];
        const subValue = item[this.subValue!];

        if(subTitle && subValue){
          this.listItemsWithTitle.push({
            key: subTitle,
            value: subValue
          })
        }
      })    }

  }
}
