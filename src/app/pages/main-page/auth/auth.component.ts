import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/services/account.service';
import { Router } from '@angular/router';

@Component({
    selector: 'la-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    sign_in_data = {
        name: '',
        password: ''
    };

    constructor(
        private _router: Router,
        private _account: AccountService
    ) { }

    ngOnInit() {
        this._account.current_user.subscribe(value => {
            if (value) { this._router.navigate(['/main/home']); }
        });
    }

    sign_in(event) {
        this._account.log_in(this.sign_in_data);
    }
}
