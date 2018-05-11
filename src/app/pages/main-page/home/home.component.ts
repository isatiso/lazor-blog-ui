import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { CategoryDataService } from 'app/services/database/category-data.service';
import { ButlerService } from 'services/components/butler.service';

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
        trigger('loadArticle', [
            state('1', style({ transform: 'translateX(0)', opacity: 1 })),
            transition('* => 1', animate('200ms cubic-bezier(0, 1, 1, 1)'))
        ]),
        trigger('showOptions', [
            state('options', style({ transform: 'translateX(-45%)', })),
            state('current', style({ transform: 'translateX(-5%)', })),
            state('none', style({ transform: 'translateX(0)', })),
            transition('* => *', animate('200ms cubic-bezier(0, 1, 1, 1)')),
        ]),
    ]
})
export class HomeComponent implements OnInit {

    load_article = 0;

    constructor(
        public _category: CategoryDataService,
        private _butler: ButlerService
    ) { }

    @ViewChild('topSpacer') top_spacer;
    @ViewChild('bottomSpacer') bottom_spacer;

    ngOnInit() {
        this._category.get_categories();
        this.top_spacer.nativeElement.style.height = '3rem';
        this.bottom_spacer.nativeElement.style.height = '3rem';
        setTimeout(() => { this.load_article = 1; }, 0);
        this._butler.button_list = [{
            name: 'navToggle',
            icon: () => 'view_list',
            // callback: event => this.action.toggle_show_cate(),
            callback: event => { },
            tool_tip: () => '编辑文章 (ctrl + E)',
        }, {
            name: 'navCreate',
            icon: () => 'create',
            // callback: event => this.action.create_article(),
            callback: event => { },
            tool_tip: () => '写新文章'
        }, {
            name: 'navCreateCategory',
            icon: () => 'create_new_folder',
            // callback: event => this.action.create_category(),
            callback: event => { },
            tool_tip: () => '添加分类'
        }, {
            name: 'navTop',
            icon: () => 'arrow_upward',
            // callback: event => this._scrollor.goto_top(),
            callback: event => { },
            tool_tip: () => '回到顶部 (ctrl + ↑)'
        }];
    }

    get categories() {
        return this._category.list.value;
    }

    get articles() {
        return this._category.articles.value;
    }

    show_options(category) {
        let res = '';
        if (!this.is_current(category)) {
            res = 'none';
        } else if (category.show_options) {
            res = 'options';
        } else {
            res = 'current';
        }
        return res;
    }

    is_current(category) {
        return this._category.is_current(category);
    }

    set_current_category(category) {
        const status = category.show_options;
        for (const cate of this._category.list.value) {
            cate.show_options = 'none';
        }
        if (!this.is_current(category)) {
            category.show_options = 'current';
            this._category.get_articles(category);
        } else {
            category.show_options = status === 'options' ? 'current' : 'options';
        }
    }

}
