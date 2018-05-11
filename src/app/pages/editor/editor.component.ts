import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'la-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    content = 'aefaefaef';
    render_latex = 1;

    @ViewChild('editor') editor;

    constructor() { }

    ngOnInit() {
        console.log(this.editor);
        const form_container = this.editor._elementRef.nativeElement;
        const input_container = this.editor._inputContainerRef.nativeElement;

        form_container.style.padding = 0;
        form_container.style.margin = 0;

        // this.editor.nativeElement.style.height = window.innerHeight + 'px';
    }

}
