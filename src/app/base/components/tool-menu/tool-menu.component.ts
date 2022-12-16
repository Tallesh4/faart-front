import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tool-menu',
  templateUrl: './tool-menu.component.html',
  styleUrls: ['./tool-menu.component.scss']
})
export class ToolMenuComponent implements OnInit {

  @Input() title: string = "Ferramentas Administrativas";
  @Input() fastNavigationData: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
