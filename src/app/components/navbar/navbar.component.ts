import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'app/services/account.service';
import { StorageService } from 'app/services/storage.service';

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
        public account: AccountService,
        private _storage: StorageService
    ) { }

    @ViewChild('navbar') navbar;
    @ViewChild('navbarSpacer') navbar_spacer;

    ngOnInit() {
        this.navbar_spacer.nativeElement.style.height = this.navbar.nativeElement.offsetHeight + 'px';
    }

    get current_user() {
        return this.account.current_user.value;
    }

    log_out() {
        this.account.log_out();
    }

    clear_session_storage() {
        this._storage.sclear();
    }
}
