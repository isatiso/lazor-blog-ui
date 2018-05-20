import { Component, OnInit } from '@angular/core';

import { ContentService } from 'services/components/content.service';
import { AboutContent } from './about.md';

@Component({
    selector: 'la-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    about_content = new AboutContent();

    constructor(
        private _content: ContentService
    ) { }

    ngOnInit() {
        this._content.title.next('关于 Lazor Blog');
        this._content.content.next(this.about_content.content);
    }

}
