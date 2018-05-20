import { Component, OnInit, ViewChild, OnDestroy, ViewChildren } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { SortablejsOptions } from 'angular-sortablejs';

import { CategoryDataService } from 'app/services/database/category-data.service';
import { ButlerService } from 'services/components/butler.service';
import { AccountService } from 'app/services/account.service';
import { BosskeyService } from 'app/services/bosskey.service';
import { ScrollorService } from 'app/services/scrollor.service';
import { Router } from '@angular/router';
import { NoticeService } from 'app/services/notice.service';
import { ArticleDataService } from 'app/services/database/article-data.service';

declare var Sortable: any;

@Component({
    selector: 'la-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [
        // trigger('pageAppear', [
        //     state('active', style({ opacity: 1, })),
        //     state('inactive', style({ opacity: 0, })),

        //     transition('void <=> active', animate('300ms cubic-bezier(0, 1, 1, 1)')),
        //     transition('inactive <=> active', animate('300ms cubic-bezier(0, 1, 1, 1)'))
        // ]),
        // trigger('cateSortState', [
        //     state('1', style({ borderRadius: '5px', backgroundColor: '#e0f7fa' })),
        //     state('0', style({ borderRadius: '0px', backgroundColor: '#fafafa' })),

        //     transition('1 <=> 0', animate('200ms ease-in'))
        // ]),
        // trigger('artSortState', [
        //     state('1', style({ borderRadius: '5px', backgroundColor: '#e0f7fa' })),
        //     state('0', style({ borderRadius: '0px', backgroundColor: '#ffffff' })),

        //     transition('1 <=> 0', animate('200ms ease-in'))
        // ]),
        // trigger('showCate', [
        //     state('1', style({ transform: 'translateX(0)', })),
        //     state('0', style({ transform: 'translateX(-100%)', })),

        //     transition('void => 0', animate('200ms linear')),
        //     transition('0 <=> 1', animate('200ms linear'))
        // ]),

        // trigger('infoAppear', [
        //     state('1', style({ opacity: 1 })),

        //     transition('void <=> 1', animate('200ms cubic-bezier(0, 1, 1, 1)'))
        // ]),
        trigger('cateSortState', [
            state('1', style({ borderRadius: '5px', backgroundColor: '#e0f7fa' })),
            state('0', style({ borderRadius: '0px', backgroundColor: '#fafafa' })),

            transition('1 <=> 0', animate('200ms ease-in'))
        ]),
        trigger('artSortState', [
            state('1', style({ borderRadius: '5px', backgroundColor: '#e0f7fa' })),
            state('0', style({ borderRadius: '0px', backgroundColor: '#ffffff' })),

            transition('1 <=> 0', animate('200ms ease-in'))
        ]),
        // trigger('loadArticle', [
        //     state('1', style({ transform: 'translateX(0)', opacity: 1 })),
        //     transition('* => 1', animate('200ms cubic-bezier(0, 1, 1, 1)'))
        // ]),
        trigger('showOptions', [
            state('options', style({ transform: 'translateX(-45%)', })),
            state('current', style({ transform: 'translateX(-5%)', })),
            state('none', style({ transform: 'translateX(0)', })),
            transition('* => *', animate('200ms cubic-bezier(0, 1, 1, 1)')),
        ]),
    ]
})
export class HomeComponent implements OnInit, OnDestroy {

    load_article = 0;
    toggle_state = 0;

    public article_sort_options: SortablejsOptions = {
        animation: 100,
        disabled: false,
        onStart: event => {
            event.item.style.opacity = 0;
        },
        onEnd: event => {
            event.item.style.opacity = 1;
            this.category.push_article_order();
        },
    };

    public category_sort_options: SortablejsOptions = {
        animation: 100,
        disabled: false,
        onStart: event => {
            event.item.style.opacity = 0;
        },
        onEnd: event => {
            event.item.style.opacity = 1;
            this.category.push_category_order();
            this.load_article = 1;
        },
    };

    constructor(
        public account: AccountService,
        public category: CategoryDataService,
        public bosskey: BosskeyService,
        private _scroller: ScrollorService,
        private _article: ArticleDataService,
        private _butler: ButlerService,
        private _notice: NoticeService,
        private _router: Router
    ) { }

    @ViewChild('topSpacer') top_spacer;
    @ViewChild('bottomSpacer') bottom_spacer;

    set_butler() {
        this._butler.button_list = [{
            name: 'navCreate',
            icon: () => 'create',
            // callback: event => this.action.create_article(),
            callback: event => { this.create_article(); },
            tool_tip: () => '写新文章'
        }, {
            name: 'navCreateCategory',
            icon: () => 'create_new_folder',
            // callback: event => this.action.create_category(),
            callback: event => { this.create_category(); },
            tool_tip: () => '添加分类'
        }, {
            name: 'navTop',
            icon: () => 'arrow_upward',
            callback: event => this._scroller.goto_top(),
            tool_tip: () => '回到顶部 (ctrl + ↑)'
        }];
    }

    toggle_sort() {

        if (this.toggle_state) {
            this.toggle_state = 0;
        } else {
            this.toggle_state = 1;
        }

        this.article_sort_options = Object.assign(Object.create({}),
            this.article_sort_options, { disabled: !this.toggle_state });
        this.category_sort_options = Object.assign(Object.create({}),
            this.category_sort_options, { disabled: !this.toggle_state });
    }

    ngOnInit() {
        // const sortable = Sortable.create('#article-list', this.article_sort_options);
        document.body.style.backgroundColor = '#f0f0f0';
        this.category.get_categories();
        this.top_spacer.nativeElement.style.height = '3rem';
        this.bottom_spacer.nativeElement.style.height = '3rem';
        setTimeout(() => {
            this.load_article = 1;
        }, 0);
        this.set_butler();
    }

    ngOnDestroy() {
        document.body.style.backgroundColor = '';
    }

    get categories() {
        return this.category.list.value;
    }

    get articles() {
        return this.category.articles.value;
    }

    get articles_num() {
        if (!this.category.articles.value) {
            return 0;
        } else {
            return this.category.articles.value.length;
        }
    }

    is_current(category) {
        return this.category.is_current(category);
    }

    set_current_category(category) {
        const status = category.show_options;
        for (const cate of this.category.list.value) {
            cate.show_options = 'none';
        }
        if (!this.is_current(category)) {
            category.show_options = 'current';
            this.category.get_articles(category);
        } else {
            category.show_options = status === 'options' ? 'current' : 'options';
        }
    }

    go_editor(article_id) {
        this._router.navigate(['/editor/' + article_id]);
    }

    create_article() {
        this._article.create(this.category.current.value.category_id);
    }

    delete_article(article_id, title) {
        this._notice.warn(
            {
                msg: `删除 《${title}》`
            },
            res => {
                if (res && article_id) {
                    this._article.delete(article_id);
                }
            }
        ).subscribe();
    }

    create_category() {
        this._notice.input({
            input_list: [{
                name: 'category_name',
                placeholder: 'Enter a New Name',
                value: '',
                required: true
            }]
        }, data => {
            if (!data) { return; }
            this.category.create(data.category_name.value);
        }).subscribe();
    }

    modify_category(event, category) {
        this._notice.input({
            input_list: [{
                name: 'category_name',
                placeholder: 'Change Name of The Category',
                value: category.category_name
            }]
        }, data => {
            if (!data) { return; }
            this.category.modify(category.category_id, data.category_name.value);
        }).subscribe();
    }

    delete_category(event, category_id) {
        this._notice.warn(
            {
                msg: '删除分类以及分类中所有的文章'
            },
            res => {
                if (res && category_id) {
                    this.category.delete(category_id);
                }
            }
        ).subscribe();
    }

}
