import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'app/services/account.service';

@Component({
    selector: 'la-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    get outer_width(): number {
        return window.outerWidth;
    }

    constructor(
        private _account: AccountService
    ) { }

    @ViewChild('navbar') navbar;
    @ViewChild('navbarSpacer') navbar_spacer;

    ngOnInit() {
        this.navbar_spacer.nativeElement.style.height = this.navbar.nativeElement.offsetHeight + 'px';
    }

    get current_user() {
        return this._account.current_user.value;
    }

    log_out() {
        this._account.log_out();
    }
}
