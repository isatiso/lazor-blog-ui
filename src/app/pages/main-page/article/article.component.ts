import { Component, OnInit } from '@angular/core';

import { ContentService } from 'services/content.service';

@Component({
    selector: 'la-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

    constructor(
        private _content: ContentService
    ) { }

    ngOnInit() {
        this._content.title.next('article');
        this._content.content.next(
            `
## article works!
## article works!
## article works!
## article works!
## article works!
## article works!
## article works!
## article works!
## article works!`
        );
    }

}
