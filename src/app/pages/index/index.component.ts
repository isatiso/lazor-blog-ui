import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'la-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    name = '';
    email = '';
    password = '';
    constructor() { }

    ngOnInit() {
    }

    sign_up(event) {
        console.log(event);
    }
}
