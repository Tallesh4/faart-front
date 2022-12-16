import {
	Component,
	EventEmitter,
	HostListener,
	Input,
	OnInit,
	Output,
	Renderer2,
	ViewChild,
	ChangeDetectorRef
} from '@angular/core';

@Component({
	selector: 'modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

	@Input() title = '';
	@Input() widthContent = '';
	@Output() closeModal = new EventEmitter();
	@ViewChild('contentModal') contentModal: any;

	public alignContentModal = false;

	constructor(private renderer: Renderer2, private cdRef:ChangeDetectorRef) {}
	@HostListener('document:keydown.escape', ['$event']) onKeydownHandler(): any {
		this.FuncCloseModal();
	}

	ngOnInit(): void {
		this.renderer.addClass(document.body, 'modal-open');
		this.renderer.addClass(document.documentElement, 'modal-open');
	}

	ngAfterViewChecked() {
		const modalElement = this.contentModal.nativeElement.getBoundingClientRect().height;
		if(modalElement > window.innerHeight){
			this.alignContentModal = true;
			this.cdRef.detectChanges();
		}
	}

	closeAllModal(event: any): any {
		if (event.srcElement.className === 'wiz-modal' || event.srcElement.className === 'wiz-modal noCenter'){
			this.FuncCloseModal();
		}
	}

	setWidth(): string {
		return this.widthContent ? `width: ${this.widthContent}px; min-width: ${this.widthContent}px;` : ''
	}

	FuncCloseModal(): any {
		this.renderer.removeClass(document.body, 'modal-open');
		this.renderer.removeClass(document.documentElement, 'modal-open');
		this.closeModal.emit();
	}

}
