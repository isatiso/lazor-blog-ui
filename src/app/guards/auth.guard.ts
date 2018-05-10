import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AccountService } from 'app/services/account.service';
import { LazorBlogApi } from 'app/public/api-definition';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    private _api = new LazorBlogApi();

    constructor(
        private _http: HttpClient,
        private _router: Router,
        private _account: AccountService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this._http.get(this._api.guard_auth()).map(
            res => {
                if (!res['status']) {
                    return true;
                } else {
                    console.log(res);
                    const params: NavigationExtras = {
                        queryParams: { 'backurl': state.url },
                    };
                    this._account.current_user.next(null);
                    this._router.navigate(['/main/auth'], params);
                    return false;
                }
            }
        ).catch(
            error => {
                this._router.navigate(['/main/auth']);
                this._account.current_user.next(null);
                return new Observable<boolean>();
            });
    }
}
