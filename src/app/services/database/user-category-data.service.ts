import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category, ArticleData, Options } from 'app/public/data-struct-definition';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'app/services/storage.service';
import { LazorBlogApi } from 'app/public/api-definition';

@Injectable({
    providedIn: 'root'
})
export class UserCategoryDataService {
    categories = new BehaviorSubject<Category[]>(null);
    current = new BehaviorSubject<Category>(null);
    articles = new BehaviorSubject<ArticleData[]>(null);
    loading_articles = new BehaviorSubject<boolean>(false);
    loading_categories = new BehaviorSubject<boolean>(false);


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

    get_categories(user_id, options?: Options) {
        // 使用缓存的版本
        options = options || new Options({});
        const cache_info = this._storage.sread('user|' + user_id);

        if (options.flush || !cache_info) {
            this._http.get(this._api.category(), { params: { user_id: user_id } }).subscribe(
                res => {
                    if (res['data']) {
                        let data = this._assemble_data(
                            res['data']['category_list'], res['data']['order_list'], 'category_id');
                        data = data.map(item => new Category(item));
                        this._storage.swrite('user|' + user_id, JSON.stringify(data));
                        this.categories.next(data);
                        this.set_current(data[0]);
                        this.get_articles(data[0]);
                    }
                },
                error => {
                    console.log(error);
                }
            );
        } else {
            this.categories.next(JSON.parse(cache_info));
            this.set_current(JSON.parse(cache_info)[0]);
            this.get_articles(JSON.parse(cache_info)[0]);
        }
    }

    get_articles(category?: Category, options?: Options) {
        // 使用缓存的版本
        options = options || new Options({});
        this.set_current(category);
        const cache_info = this._storage.sread('category-' + category.category_id);
        this.loading_articles.next(true);

        if (options.flush || !cache_info) {
            this._http.get(this._api.article_list(), { params: { category_id: category.category_id } }).subscribe(
                res => {
                    const data = this._assemble_data(
                        res['data']['article_list'], res['data']['order_list'], 'article_id');
                    this._storage.swrite('category-' + category.category_id, JSON.stringify(data));
                    this.articles.next(data);
                    this.loading_articles.next(false);
                },
                error => {
                }
            );
        } else {
            this.articles.next(JSON.parse(cache_info));
            this.loading_articles.next(false);
        }
    }

    set_current(category: Category) {
        for (const item of this.categories.value) {
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
}
