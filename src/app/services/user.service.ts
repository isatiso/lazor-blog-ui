import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { NoticeService } from 'services/notice.service';
import { Account } from 'public/data-struct-definition';
import { LazorBlogApi } from 'app/public/api-definition';
import { StorageService } from 'app/services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    current_user = new BehaviorSubject<Account>({ user_id: '', user_name: '', supervisor: 0 });
    private _api = new LazorBlogApi();

    public pattern = {
        email: /^([\w-.]+)@([\w-]+)(\.([\w-]+))+$/,
        password: /^[0-9A-Za-z`~!@#$%^&*()_+\-=\{\}\[\]:;"'<>,.\\|?/ ]{6,24}$/,
        nickname: /^[\w\-\u4e00-\u9fa5]{1,12}$/,
    };

    constructor(
        private _http: HttpClient,
        private _router: Router,
        private _route: ActivatedRoute,
        private _notice: NoticeService,
        private _storage: StorageService
    ) { }

    get_user(user_id) {
        this._http.get(this._api.user(), { params: { user_id: user_id } }).subscribe(
            res => {
                if (!res['status']) {
                    this.current_user.next(res['data']);
                }
            });
    }
}
