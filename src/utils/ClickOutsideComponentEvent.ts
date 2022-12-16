import { Component, Input, Renderer2 } from "@angular/core";

@Component({
    template: ''
})
export abstract class ClickOutsideWindowsEvent {

    @Input() key: number | string = 0;

    constructor(
        private renderer: Renderer2
    ) {
        this.renderer.listen('window', 'click', (event) => {

            let element = (<HTMLElement>event.target);


            if (!element.classList || !element.classList.contains(`${this.key}`)) {

                this.clickOutSideElement();

            }


        })
    }

    public clickOutSideElement() {

    }
}
