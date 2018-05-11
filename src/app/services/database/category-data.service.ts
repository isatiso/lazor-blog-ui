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

    set_current(category: Category) {
        for (const item of this.list.value) {
            if (item.category_id === category.category_id) {
                item.show_options = 'current';
                break;
            }
        }
        this.current.next(category);
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
        // 使用缓存的版本
        options = options || new Options({});
        const cache_info = this._storage.sread('category_list');
        console.log(this.current.value);

        if (options.flush || !cache_info) {
            this._http.get(this._api.category()).subscribe(
                res => {
                    if (res['data']) {
                        let data = this._assemble_data(
                            res['data']['category_list'], res['data']['order_list'], 'category_id');
                        data = data.map(item => new Category(item));
                        this._storage.swrite('category_list', JSON.stringify(data));
                        this.list.next(data);
                        if (this.current.value) {
                            this.get_articles(this.current.value);
                        } else {
                            this.set_current(data[0]);
                            this.get_articles(data[0]);
                        }
                    }
                },
                error => {
                    console.log(error);
                }
            );
        } else {
            this.list.next(JSON.parse(cache_info));
            if (this.current.value) {
                this.get_articles(this.current.value);
            } else {
                this.set_current(JSON.parse(cache_info)[0]);
                this.get_articles(JSON.parse(cache_info)[0]);
            }
        }
    }

    get_articles(category?: Category, options?: Options) {
        // 使用缓存的版本
        options = options || new Options({});
        this.set_current(category);
        const cache_info = this._storage.sread('category-' + category.category_id);

        if (options.flush || !cache_info) {
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
        } else {
            this.articles.next(JSON.parse(cache_info));
        }
    }
}
