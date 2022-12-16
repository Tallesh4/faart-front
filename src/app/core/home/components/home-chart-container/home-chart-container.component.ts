import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HomeQueryDefault } from '../../home.interface';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-home-chart-container',
  templateUrl: './home-chart-container.component.html',
  styleUrls: ['./home-chart-container.component.scss']
})
export class HomeChartContainerComponent implements OnInit {

  clientDataChart: number[] = [];
  clientLabelsChart: string[] = [];
  @Input() title:string = ""
  @Input() loadingClientChart: boolean = false;

  @Output() changeOptions = new EventEmitter();
  @Output() changeRefresh = new EventEmitter();
  @Output() changeBilling = new EventEmitter();

  constructor(
    private homeService : HomeService
  ) { }

  ngOnInit(): void {
  }

  onChangeOptions(event:any){
    this.changeOptions.emit(event);
  }

  onChangeRefresh(event:any){
    this.changeRefresh.emit(event);
  }

  onChangeBilling(event:any){
    this.changeBilling.emit(event);
  }
}
