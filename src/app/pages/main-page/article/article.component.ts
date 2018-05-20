import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ContentService } from 'services/components/content.service';
import { ArticleDataService } from 'services/database/article-data.service';
import { ButlerService } from 'app/services/components/butler.service';
import { ScrollorService } from 'app/services/scrollor.service';
import { BosskeyService } from 'app/services/bosskey.service';
import { HttpClient } from '@angular/common/http';
import { LazorBlogApi } from 'app/public/api-definition';


@Component({
    selector: 'la-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
    current = '';
    title = '';
    renderLatex = 1;
    category = {};
    author = {};
    create_time = 0;
    update_time = 0;

    private _content_data = '';
    private _api = new LazorBlogApi();

    @ViewChild('topSpacer') top_spacer;

    constructor(
        private _content: ContentService,
        private _butler: ButlerService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _scrollor: ScrollorService,
        private _http: HttpClient,
        public article: ArticleDataService,
        public bosskey: BosskeyService,
    ) { }

    get content() {
        return this._content_data;
    }

    set content(value) {
        this.renderLatex += 1;
        this._content_data = value;
    }

    public action = Object.assign(Object.create(null), {
        self: this,
        go_top: (event?) => {
            this._scrollor.goto_top();
        },
        go_bottom: (event?) => {
            this._scrollor.goto_bottom();
        },
        go_editor: (event?) => {
            this._router.navigate(['/editor/' + this.current]);
        },
        go_home: (event?) => {
            this._router.navigate(['/main/home']);
        },
    });

    get_article_relative() {
        this._http.get(this._api.article_relative(), { params: { article_id: this.current } }).subscribe(
            res => {
                if (!res['status']) {
                    this.category = res['data']['category'];
                    this.author = res['data']['user'];
                }
            });
    }

    set_boss_key() {
        this.bosskey.cover({
            ArrowUp: this.action.go_top,
            ArrowDown: this.action.go_bottom,
            e: this.action.go_editor,
            0: this.action.go_home,
        });
    }

    set_butler() {
        this._butler.button_list = [{
            name: 'goEditor',
            icon: () => 'edit',
            callback: event => this.action.go_editor(event),
            tool_tip: () => '编辑文章 (ctrl + E)',
        }, {
            name: 'navTop',
            icon: () => 'arrow_upward',
            callback: event => this._scrollor.goto_top(event),
            tool_tip: () => '回到顶部 (ctrl + ↑)',
        }];
    }


    ngOnInit() {
        this.current = this._route.params['value']['id'];
        this.article.loading_content.next(true);
        this.article.get_article(this.current).subscribe(
            value => {
                this._content.title.next(value.title);
                this._content.content.next(value.content);
                this._content.create_time.next(value.create_time);
                this._content.update_time.next(value.update_time);
                this.article.loading_content.next(false);
            });
        this._content.content.subscribe(
            value => { this.content = value; });
        this._content.title.subscribe(
            value => { this.title = value; });
        this._content.create_time.subscribe(
            value => { this.create_time = value * 1000; });
        this._content.update_time.subscribe(
            value => { this.update_time = value * 1000; });
        this.set_butler();
        this.set_boss_key();
        this.get_article_relative();
    }


    ngOnDestroy() {
        this.bosskey.clear();
        this.content = '';
        this.title = '';
    }


}
