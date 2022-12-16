import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BaseService } from "../../base.service";

@Component({
    selector: 'drop-file-input',
    templateUrl: './drop-file-input.component.html',
    styleUrls: [
        './drop-file-input.component.scss'
    ]
})
export class DropFileInputComponent {
    @Output() onChange = new EventEmitter<File | FileList>();
    @Input() accept: string = "";
    @Input() icon = "upload_file";
    @Input() multiple = false;
    @Input() id = "file";

    file?: File;
    hover = false;
    files?: FileList;

    constructor(
        private toastr: BaseService,
    ) { }

    changeFile(event: Event) {
        const input = <HTMLInputElement>event.target;
        if(input.files?.length) {
            if(this.multiple) {
                this.files = input.files;
            } else {
                this.file = input.files[0];
            }
            this.onChange.emit(this.multiple ? this.files : this.file);
        } else {
            this.onChange.emit(undefined);
        }
    }
    dropFile(event: any) {
        event.preventDefault();
        if(event.dataTransfer.files.length) {
            let file = event.dataTransfer.files[0];
            let acceptTypes = new Set([this.accept]);

            if(acceptTypes.has(file.type)) {
                this.file = file;
                this.onChange.emit(this.multiple ? event.dataTransfer.files : this.file);
            } else {
                this.toastr.error('Tipo de arquivo inválido');
            }
        }
        this.hover = false;
    }

    dragover(event: Event) {
        event.preventDefault();
        this.hover = true;
    }

    dragend(event: Event) {
        this.hover = false;
    }
}