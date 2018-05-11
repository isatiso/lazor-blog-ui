import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ContentService } from 'services/components/content.service';
import { ArticleDataService } from 'services/database/article-data.service';
import { ButlerService } from 'app/services/components/butler.service';
import { ScrollorService } from 'app/services/scrollor.service';
import { BosskeyService } from 'app/services/bosskey.service';


@Component({
    selector: 'la-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
    current = '';
    constructor(
        private _content: ContentService,
        private _butler: ButlerService,
        private _article_data: ArticleDataService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _scrollor: ScrollorService,
        public bosskey: BosskeyService,
    ) { }

    public action = Object.assign(Object.create(null), {
        self: this,
        go_editor: (event?) => {
            this._router.navigate(['/editor/' + this.current]);
        },
        go_top: (event?) => {
            this._scrollor.goto_top();
        },
        go_bottom: (event?) => {
            this._scrollor.goto_bottom();
        },
        go_home: (event?) => {
            this._router.navigate(['/main/home']);
        },
    });

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
            name: 'navEditor',
            icon: () => 'mode_edit',
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
        this._article_data.get_article(this.current).subscribe(
            value => {
                this._content.title.next(value.title);
                this._content.content.next(value.content);
            });
        this.set_butler();
        this.set_boss_key();
    }

    ngOnDestroy() {
        this.bosskey.clear();
    }


}
