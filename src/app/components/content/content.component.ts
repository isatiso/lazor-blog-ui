import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentService } from 'services/content.service';

@Component({
    selector: 'la-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
    title = '';
    content = '';
    constructor(
        private _content: ContentService
    ) { }

    @ViewChild('topSpacer') top_spacer;

    ngOnInit() {
        this.top_spacer.nativeElement.style.height = '3rem';

        this._content.content.subscribe(value => {
            this.content = value;
        });
        this._content.title.subscribe(value => {
            this.title = value;
        });
    }

}
