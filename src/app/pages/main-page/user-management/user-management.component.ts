import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'app/services/account.service';

@Component({
    selector: 'la-user-management',
    templateUrl: './user-management.component.html',
    styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

    constructor(
        public account: AccountService
    ) { }

    @ViewChild('topSpacer') top_spacer;
    @ViewChild('bottomSpacer') bottom_spacer;

    ngOnInit() {
        this.account.get_user_list();
        this.top_spacer.nativeElement.style.height = '3rem';
        this.bottom_spacer.nativeElement.style.height = '3rem';
    }

}
