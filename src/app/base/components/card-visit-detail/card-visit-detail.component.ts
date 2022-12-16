import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-card-visit-detail',
  templateUrl: './card-visit-detail.component.html',
  styleUrls: ['./card-visit-detail.component.scss']
})
export class CardVisitDetailComponent implements OnInit {

  @Input() item = <any>{};
  @Input() cardPosition = 0;

  constructor() { }

  ngOnInit(): void {
  }


  toggleBodyVisibility(element: any) {
    let parent = element.parentNode;
    let box = parent.getElementsByClassName('body')[0];

    if(!element.classList.contains('opened')){
      element.classList.add('opened')
    }else{
      element.classList.remove('opened')
    }

    if (!box.classList.contains('active')) {
      box.classList.add('active')
    } else {
      box.classList.remove('active')
    }
  }

}
