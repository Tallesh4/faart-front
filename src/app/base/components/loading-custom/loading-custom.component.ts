import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: './loading-custom.component.html',
  styleUrls: ['./loading-custom.component.scss']
})
export class LoadingCustomComponent implements OnInit {

  @Input() color: string = "";
  @Input() size: string = "";

	acordion = 'listview'

  constructor() { }

  ngOnInit(): void {
    this.acordion = "block";
  }

}
