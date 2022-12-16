import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'input-custom',
  templateUrl: './input-custom.component.html',
  styleUrls: ['./input-custom.component.scss']
})
export class InputCustomComponent implements OnInit {
  @Input() label = '';
  @Input() value = '';
  @Input() type = '';
  @Input() class = '';
  @Input() disabled = '';
  @Input() select: any[] = [];
  @Input() formControlName: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
