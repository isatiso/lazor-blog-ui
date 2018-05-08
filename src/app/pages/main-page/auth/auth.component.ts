import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'la-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    name = '';
    email = '';
    password = '';

    newname = '';
    newemail = '';
    newpassword = '';

    constructor() { }

    ngOnInit() {
    }

    sign_in(event) {
        console.log(this.name, this.password);
    }

    sign_up(event) {

    }
}
