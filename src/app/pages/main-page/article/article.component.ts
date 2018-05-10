import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ContentService } from 'services/components/content.service';
import { ArticleDataService } from 'services/database/article-data.service';


@Component({
    selector: 'la-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
    current = '';
    constructor(
        private _content: ContentService,
        private _article_data: ArticleDataService,
        private _route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.current = this._route.params['value']['id'];
        this._article_data.get_article(this.current).subscribe(
            value => {
                this._content.title.next(value.title);
                this._content.content.next(value.content);
            });
    }

}
