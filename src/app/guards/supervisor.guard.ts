import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationExtras } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AccountService } from 'app/services/account.service';
import { LazorBlogApi } from 'app/public/api-definition';

@Injectable({
    providedIn: 'root'
})
export class SupervisorGuard implements CanActivate {
    private _api = new LazorBlogApi();

    constructor(
        private _http: HttpClient,
        private _router: Router,
        private _account: AccountService
    ) { }

    private _extract_cookie(cookie) {
        const items = cookie.split('|');
        if (items.length !== 6) {
            return null;
        }
        const timestamp = items[2].split(':')[1];
        const info = atob(items[4].split(':')[1]);
        return [timestamp, info];
    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this._http.get(this._api.guard_supervisor()).map(
            res => {
                if (!res['status']) {
                    return true;
                } else {
                    const params: NavigationExtras = {
                        queryParams: { 'backurl': state.url },
                    };
                    this._router.navigate(['/main/auth'], params);
                    return false;
                }
            }
        ).catch(
            error => {
                this._router.navigate(['/main/auth']);
                return new Observable<boolean>();
            });
    }
}
