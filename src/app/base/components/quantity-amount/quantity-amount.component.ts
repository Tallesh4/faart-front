import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'quantity-amount',
  templateUrl: './quantity-amount.component.html',
  styleUrls: ['./quantity-amount.component.scss']
})
export class QuantityAmountComponent {

  constructor() { }

  @Output() changeAmountItem = new EventEmitter();
  quantityItems = [10, 25, 50, 100];  

  changeAmount(number: any){
    this.changeAmountItem.emit(number.value)
  }
}
