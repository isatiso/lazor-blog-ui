import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ContentService } from 'services/components/content.service';
import { ArticleDataService } from 'app/services/database/article-data.service';

@Component({
    selector: 'la-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit, OnDestroy {
    title = '';
    renderLatex = 1;

    private _content_data = '';

    constructor(
        private _content: ContentService,
        public article: ArticleDataService,
    ) { }

    @ViewChild('topSpacer') top_spacer;

    ngOnInit() {
        // this.top_spacer.nativeElement.style.height = '3rem';

        this._content.content.subscribe(
            value => { this.content = value; });

        this._content.title.subscribe(
            value => { this.title = value; });
    }

    ngOnDestroy() {
        this.content = '';
        this.title = '';
    }

    get content() {
        return this._content_data;
    }

    set content(value) {
        this.renderLatex += 1;
        this._content_data = value;
    }

}
