import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleDataService } from 'app/services/database/article-data.service';

@Component({
    selector: 'la-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    content_data = 'aefaefaef';
    current = '';
    render_latex = 1;
    timer = null;

    current_data = {
        title: '',
        content: '',
    };

    @ViewChild('editor') editor;

    constructor(
        private _route: ActivatedRoute,
        private _article: ArticleDataService,
    ) { }

    get content() {
        return this.current_data.content;
    }

    set content(value) {
        clearTimeout(this.timer);
        this.current_data.content = value;
        this.timer = setTimeout(() => { this.render_latex++; }, 400);
    }

    get title() {
        return this.current_data.title;
    }

    set title(value) {
        clearTimeout(this.timer);
        this.current_data.title = value;
        this.timer = setTimeout(() => { this.render_latex++; }, 400);
    }

    ngOnInit() {
        this.current = this._route.params['value']['id'];
        this._article.get_article(this.current).subscribe(
            value => {
                this.current_data.title = value.title;
                this.current_data.content = value.content;
                this.render_latex++;
            });
        // this.editor.nativeElement.style.height = window.innerHeight + 'px';
    }

}
