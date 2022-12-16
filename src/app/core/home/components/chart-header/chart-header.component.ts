import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Calendar from 'src/utils/Calendar';

@Component({
  selector: 'chart-header',
  templateUrl: './chart-header.component.html',
  styleUrls: ['./chart-header.component.scss']
})
export class ChartHeaderComponent implements OnInit {

  key: number = new Date().getTime();
  @Input() title: string = "";
  @Input() enableOptionMonth?: boolean = true;
  @Input() billingCheckbox: boolean | undefined = false;
  @Output() changeOptions = new EventEmitter();
  @Output() changRefresh = new EventEmitter();
  @Output() changBilling = new EventEmitter();

  formDefault = new FormGroup({
    value: new FormControl(new Date().getMonth() + 1),
    billing: new FormControl(this.billingCheckbox)
  })

  monthsList = Calendar.getListOfMonths();

  constructor() { }

  ngOnInit(): void {
  }

  changeMonth(value: any) {
    this.changeOptions.emit({
      month: parseInt(value),
      billing: this.formDefault.value.billing
    });
  }

  changeBilling() {
    if (!this.formDefault.value.billing) {
      return this.changBilling?.emit({
        value: undefined
      })
    }

    this.changBilling?.emit({
      value: this.formDefault.value.billing
    })
  }

  refresh() {
    this.changRefresh.emit({
      refresh: true
    });
  }
}
