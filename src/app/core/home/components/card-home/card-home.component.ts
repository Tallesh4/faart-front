import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card-home',
  templateUrl: './card-home.component.html',
  styleUrls: ['./card-home.component.scss']
})
export class CardHomeComponent implements OnInit {

  constructor() { }

  @Input() materialIcon: string = "";
  @Input() title: string = "";
  @Input() value: string | number = "";
  @Input() description: string = "";
  @Input() backgroundColor: string = ""
  @Input() loading: boolean = false;

  style: string = ``

  ngOnInit(): void {
    this.style = `background-color: ${this.backgroundColor};`
  }

}
