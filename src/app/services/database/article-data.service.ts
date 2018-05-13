import { Injectable } from '@angular/core';
import { ArticleData, Options } from 'app/public/data-struct-definition';
import { BehaviorSubject, AsyncSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LazorBlogApi } from 'app/public/api-definition';
import { StorageService } from 'app/services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class ArticleDataService {

    current: BehaviorSubject<ArticleData>;
    loading_content = new BehaviorSubject<boolean>(false);

    private _api = new LazorBlogApi();

    constructor(
        private _http: HttpClient,
        private _storage: StorageService
    ) { }

    get_article(article_id, options?: Options) {
        options = options || new Options({});
        const courier = new AsyncSubject<ArticleData>();
        const cache_info = this._storage.sread('article-' + article_id);

        if (options.flush || !cache_info) {
            this._http.get(this._api.article(), {
                params: { 'article_id': article_id }
            }).subscribe(res => {
                if (res['status'] !== 0) {
                    return;
                } else {
                    const article = res['data'];
                    courier.next(res['data']);
                    courier.complete();
                    this._storage.swrite(`article-${article_id}`, JSON.stringify(article));
                }
            });
        } else {
            courier.next(JSON.parse(cache_info));
            courier.complete();
        }

        return courier;
    }
}
