import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-indicators',
  templateUrl: './card-indicators.component.html',
  styleUrls: ['./card-indicators.component.scss']
})
export class CardIndicatorsComponent implements OnInit {

  constructor() { }

  @Input() title: string = "";
  @Input() value: any = "";
  @Input() bg: string = "";
  @Input() icon: string = "";
  @Input() indicators: string = "";
  @Input() descriptionTimeline: string = "";
  @Input() loading: boolean = false;
  
  style: string = ``

  ngOnInit(): void {
    this.style = `background-color: ${this.bg};`
  }

}
