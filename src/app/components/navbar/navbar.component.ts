import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'la-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    title = 'la';

    get outer_width(): number {
        return window.outerWidth;
    }

    constructor() { }

    ngOnInit() {
    }

}
