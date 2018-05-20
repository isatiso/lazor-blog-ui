import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'app/services/account.service';
import { HttpClient } from '@angular/common/http';
import { NoticeService } from 'app/services/notice.service';
import { LazorBlogApi } from 'app/public/api-definition';

@Injectable({
    providedIn: 'root'
})
export class ArticleOwnerGuard implements CanActivate {

    private _api = new LazorBlogApi();
    constructor(
        private _notice: NoticeService,
        private _http: HttpClient,
        private _router: Router,
        private _account: AccountService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this._http.get(this._api.guard_owner(), { params: { article_id: next.firstChild.params.id } }).map(
            data => {
                if (data['status'] === 3005) {
                    const message = '请登陆后进行编辑。';
                    this._notice.bar(message, 'OK');
                    this._router.navigate(['/main/auth']);
                    return false;
                } else if (data['status'] === 4005) {
                    const message = '这是别人的文章 ~_~ |||';
                    this._notice.bar(message, 'OK');
                    return false;
                } else if (data['status']) {
                    const message = '出问题了 0_o!';
                    this._notice.bar(message, 'OK');
                    return false;
                } else {
                    return true;
                }
            },
        ).catch(
            error => {
                this._router.navigate(['/auth']);
                // this._account.data = null;
                window.localStorage.setItem('user_name', null);
                return new Observable<boolean>();
            },
        );
    }
}
