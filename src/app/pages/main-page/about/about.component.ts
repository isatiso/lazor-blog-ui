import { Component, OnInit } from '@angular/core';

import { ContentService } from 'services/content.service';

@Component({
    selector: 'la-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

    constructor(
        private _content: ContentService
    ) { }

    ngOnInit() {
        console.log('about');
        this._content.title.next('about');
        this._content.content.next(
            `
## about works!
## about works!
## about works!
## about works!
## about works!
## about works!
## about works!
## about works!
## about works!`
        );
    }

}
