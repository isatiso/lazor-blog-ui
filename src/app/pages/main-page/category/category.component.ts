import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LazorBlogApi } from 'app/public/api-definition';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'la-category',
    templateUrl: './category.component.html',
    styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

    current = '';
    category_info = {};
    article_list = [];

    private _api = new LazorBlogApi();

    constructor(
        private _route: ActivatedRoute,
        private _http: HttpClient
    ) { }

    ngOnInit() {
        this.current = this._route.params['value']['id'];
        this.get_category_info();
        this.get_articles();
    }

    get category_name() {
        return this.category_info['category_name'];
    }

    is_no_article() {
        if (!this.article_list || this.article_list.length === 0) {
            return true;
        } else {
            return false;
        }
    }

    get_category_info() {
        this._http.get(this._api.category_info(), { params: { category_id: this.current } }).subscribe(
            res => {
                if (!res['status']) {
                    this.category_info = res['data']['category_info'];
                }
            });
    }

    get_articles() {
        this._http.get(this._api.article_list(), { params: { category_id: this.current } }).subscribe(
            res => {
                if (!res['status']) {
                    this.article_list = res['data']['article_list'];
                }
            });
    }

}
