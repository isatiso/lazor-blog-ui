import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LazorBlogApi } from 'app/public/api-definition';

@Component({
    selector: 'la-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    name = '';
    email = '';
    password = '';

    private _api = new LazorBlogApi();

    articles = [];
    constructor(
        private _http: HttpClient
    ) { }

    ngOnInit() {
        this.get_latest_update();
    }

    get_latest_update() {
        this._http.get(this._api.article_latest()).subscribe(res => {
            if (!res['status']) {
                this.articles = res['data'];
            }
        });
    }

    sign_up(event) {
        console.log(event);
    }
}
