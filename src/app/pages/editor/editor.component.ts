import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDataService } from 'app/services/database/article-data.service';
import { BosskeyService } from 'app/services/bosskey.service';
import { CategoryDataService } from 'app/services/database/category-data.service';
import { Options } from 'app/public/data-struct-definition';

@Component({
    selector: 'la-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    content_data = 'aefaefaef';
    render_latex = 1;
    modified = false;
    timer = null;

    current_data = {
        title: '',
        content: '',
        category_id: '',
        article_id: ''
    };

    @ViewChild('editor') editor;

    constructor(
        public bosskey: BosskeyService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _article: ArticleDataService,
        public category: CategoryDataService
    ) { }

    get content() {
        return this.current_data.content;
    }

    set content(value) {
        clearTimeout(this.timer);
        this.modified = true;
        this.current_data.content = value;
        this.timer = setTimeout(() => { this.render_latex++; }, 400);
    }

    get title() {
        return this.current_data.title;
    }

    set title(value) {
        this.modified = true;
        this.current_data.title = value;
    }

    get category_id() {
        return this.current_data.category_id;
    }

    set category_id(value) {
        this.modified = true;
        this.current_data.category_id = value;
    }

    go_article() {
        this._router.navigate(['/main/article/' + this.current_data.article_id]);
    }

    save_article() {
        if (this.modified) {
            this._article.save(this.current_data);
            this.modified = false;
        }
    }

    set_boss_key() {
        this.bosskey.cover({
            // ArrowUp: this.action.go_top,
            // ArrowDown: this.action.go_bottom,
            // e: this.action.go_editor,
            // 0: this.action.go_home,
            s: () => { this.save_article(); }
        });
    }
    ngOnInit() {
        this.set_boss_key();
        this.current_data.article_id = this._route.params['value']['id'];
        this.category.get_categories(new Options({ flush: true }));
        this._article.get_article(this.current_data.article_id).subscribe(
            value => {
                this.current_data.title = value.title;
                this.current_data.content = value.content;
                this.current_data.category_id = value.category_id;
                this.render_latex++;
            });
    }

}
