import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LazorBlogApi } from 'app/public/api-definition';
import { Category } from 'app/public/data-struct-definition';

@Component({
    selector: 'la-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    name = '';
    email = '';
    password = '';

    category_list = [];
    article_list = [];

    private _api = new LazorBlogApi();

    constructor(
        private _http: HttpClient
    ) { }

    ngOnInit() {
        this.get_latest_update();
        this.get_categories();
    }

    get_latest_update() {
        this._http.get(this._api.article_latest()).subscribe(res => {
            if (!res['status']) {
                this.article_list = res['data']['article_list'];
            }
        });
    }

    sign_up(event) {
        console.log(event);
    }


    get_categories() {
        this._http.get(this._api.category_index()).subscribe(
            res => {
                if (!res['status']) {
                    this.category_list = res['data']['category_list'];
                }
            });
    }
}
