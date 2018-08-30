import { Injectable } from '@angular/core';
import { ArticleData, Options } from 'app/public/data-struct-definition';
import { BehaviorSubject, AsyncSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LazorBlogApi } from 'app/public/api-definition';
import { StorageService } from 'app/services/storage.service';
import { NoticeService } from 'app/services/notice.service';
import { CategoryDataService } from 'app/services/database/category-data.service';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ArticleDataService {

    current: BehaviorSubject<ArticleData>;
    loading_content = new BehaviorSubject<boolean>(false);

    private _api = new LazorBlogApi();

    constructor(
        private _http: HttpClient,
        private _notice: NoticeService,
        private _category: CategoryDataService,
        private _router: Router,
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

    create(category_id) {
        this._http.post('/middle/article', {
            category_id: category_id,
        }).subscribe(
            res => {
                if (!res['status']) {
                    this._router.navigate(['/editor/' + res['data']['article_id']]);
                    this._category.get_articles(category_id);
                } else {
                    this._notice.bar(res['msg'], res['status'], null);
                }
            });
    }

    save(source) {
        this._http.put('/middle/article', {
            article_id: source.article_id,
            title: source.title,
            content: source.content,
            category_id: source.category_id,
        }).subscribe(
            res => {
                if (!res['status']) {
                    // this._storage.swrite(`article-${res['data']['article_id']}`, JSON.stringify(res['data']));
                    this._storage.sclear();
                    this._notice.bar('Save Article Successfully.', 'OK', null);
                    this._category.get_articles(this._category.current.value, new Options({ flush: true }));
                } else if (res['status'] === 3005) {
                }
            });
    }

    publish(source) {
        this._http.post('/middle/article/publish', {
            article_id: source.article_id,
            publish_status: source.publish_status
        }).subscribe(
            res => {
                if (!res['status']) {
                    // this._storage.swrite(`article-${res['data']['article_id']}`, JSON.stringify(res['data']));
                    this._storage.sclear();
                    this._notice.bar('Publish/Unpublish Article Successfully.', 'OK', null);
                    this._category.get_articles(this._category.current.value, new Options({ flush: true }));
                } else if (res['status'] === 3005) {
                }
            });
    }

    delete(article_id: string) {
        this._http.delete('/middle/article?article_id=' + article_id).subscribe(
            res => {
                if (!res['status']) {
                    this._storage.sremove('article-' + article_id);
                    this._category.get_articles(
                        this._category.current.value, new Options({ flush: true }));
                    this._category.set_current(this._category.current.value);
                }
            },
            error => {
            }
        );
    }
}
