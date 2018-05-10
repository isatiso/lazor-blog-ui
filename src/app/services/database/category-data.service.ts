import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LazorBlogApi } from 'app/public/api-definition';
import { Category, ArticleData, Options } from 'app/public/data-struct-definition';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'app/services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class CategoryDataService {

    list = new BehaviorSubject<Category[]>(null);
    articles = new BehaviorSubject<ArticleData[]>(null);
    current = new BehaviorSubject<Category>(null);

    private _api = new LazorBlogApi();

    constructor(
        private _http: HttpClient,
        private _storage: StorageService
    ) { }

    private _assemble_data = (list, order, key) => {
        if (order && order.length) {
            list.sort((a, b) => {
                const a_index = order.findIndex(el => el === a[key]);
                const b_index = order.findIndex(el => el === b[key]);
                return a_index - b_index;
            });
        }
        return list;
    }

    is_current(category) {
        if (this.current.value) {
            if (this.current.value.category_id === category.category_id) {
                return true;
            }
        }
        return false;
    }

    get_categories(options?: Options) {
        options = options || new Options({});
        const cache_info = this._storage.sread('category_list');

        if (options.flush || !cache_info) {
            this._http.get(this._api.category()).subscribe(
                res => {
                    if (res['data']) {
                        let data = this._assemble_data(
                            res['data']['category_list'], res['data']['order_list'], 'category_id');

                        data = data.map(item => new Category(item));
                        this._storage.swrite('category_list', JSON.stringify(data));
                        this.list.next(data);
                        this.get_articles(data[0]);
                    }
                },
                error => {
                    console.log(error);
                }
            );
        } else {
            this.list.next(JSON.parse(cache_info));
            this.current.next(JSON.parse(cache_info)[0]);
        }
        console.log(this.list.value);
    }

    get_articles(category?: Category) {
        this.current.next(category);
        this._http.get(this._api.article_list(), { params: { category_id: category.category_id } }).subscribe(
            res => {
                const data = this._assemble_data(
                    res['data']['article_list'], res['data']['order_list'], 'article_id');
                this._storage.swrite('category-' + category.category_id, JSON.stringify(data));
                this.articles.next(data);
            },
            error => {
            }
        );
    }
}
