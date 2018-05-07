import { Component, OnInit } from '@angular/core';
import { ContentService } from 'services/content.service';

@Component({
    selector: 'la-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
    title = '标题';
    content = '';
    constructor(
        private _content: ContentService
    ) { }

    ngOnInit() {
        console.log(this._content.content);
        this._content.content.subscribe(value => {
            this.content = value;
            console.log(value);
        });
    }

}
