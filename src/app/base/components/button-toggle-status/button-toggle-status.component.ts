import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'button-toggle-status',
    templateUrl: './button-toggle-status.component.html'
})
export class ButtonToggleStatusComponent {
    @Input() status: boolean = true;
    @Output() onClick = new EventEmitter();

    loading = false;
}
