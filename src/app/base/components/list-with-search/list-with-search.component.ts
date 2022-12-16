import { Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { ClickOutsideWindowsEvent } from 'src/utils/ClickOutsideComponentEvent';

@Component({
  selector: 'app-list-with-search',
  templateUrl: './list-with-search.component.html',
  styleUrls: ['./list-with-search.component.scss']
})
export class ListWithSearchComponent extends ClickOutsideWindowsEvent implements OnInit {

  @Input() data: { value: string }[] | any[] = [];
  @Input() targetKey: string = "value";

  @Output() onClick = new EventEmitter();
  @Output() onClickOutSide = new EventEmitter();

  constructor(renderer: Renderer2) {
    super(renderer)
  }
	ngOnInit(): void {
		this.data.forEach(item => item.visible = true);
	}

  onSearch(target: any) {

    const value = (<HTMLInputElement>target).value;
    for (let item of this.data) {

      const targetValue = String(item[this.targetKey]).toLocaleLowerCase();
      const valueLowerCase = value.toLocaleLowerCase();

      if (!targetValue.includes(valueLowerCase)) {
				item.visible = false;
      } else {
				item.visible = true;
			}
    }
  }

  public clickOutSideElement(): void {
    this.onClickOutSide.emit(true);
  }

  onItemClick(item: any, position: number) {
    this.onClick.emit({ ...item, position });
  }
}
