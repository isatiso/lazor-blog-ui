import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'app/services/account.service';

@Injectable({
    providedIn: 'root'
})
export class AlreadyAuthGuard implements CanActivate {

    constructor(
        private _account: AccountService,
        private _router: Router
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return this._account.current_user.map(value => {
            if (value) {
                // this._router.navigate(['/main/home']);
                return false;
            } else {
                return true;
            }
        });
    }
}
