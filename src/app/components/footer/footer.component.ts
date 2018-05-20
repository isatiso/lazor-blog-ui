import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'la-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    version = '';
    constructor(
        private _http: HttpClient,
    ) { }

    ngOnInit() {
        this.get_version();
    }

    get_version() {
        this._http.get('/inner/get-version').subscribe(res => { this.version = res['version']; });
    }

}
