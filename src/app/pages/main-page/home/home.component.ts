import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'la-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor() { }

    @ViewChild('topSpacer') top_spacer;

    ngOnInit() {
        this.top_spacer.nativeElement.style.height = '3rem';
    }

}
