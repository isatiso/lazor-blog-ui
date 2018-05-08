import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'la-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

    constructor(private _router: Router) { }

    ngOnInit() {
    }

    go_home() {
        this._router.navigate(['/main/home']);
    }
}
