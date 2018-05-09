import { Component, OnInit, ViewChild } from '@angular/core';

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

    @ViewChild('navbar') navbar;
    @ViewChild('navbarSpacer') navbar_spacer;

    ngOnInit() {
        this.navbar_spacer.nativeElement.style.height = this.navbar.nativeElement.offsetHeight + 'px';
    }

}
