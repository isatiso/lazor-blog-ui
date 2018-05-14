import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'la-banner',
    templateUrl: './banner.component.html',
    styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

    constructor(private _router: Router) { }

    @ViewChild('holder') holder;
    ngOnInit() {
        this.holder.nativeElement.style.height = window.innerHeight * 0.2 + 'px';
    }

    go_home() {
        this._router.navigate(['/main/home']);
    }
}
