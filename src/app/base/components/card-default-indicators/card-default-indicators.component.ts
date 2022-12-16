import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-default-indicators',
  templateUrl: './card-default-indicators.component.html',
  styleUrls: ['./card-default-indicators.component.scss']
})
export class CardDefaultIndicatorsComponent implements OnInit {

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
