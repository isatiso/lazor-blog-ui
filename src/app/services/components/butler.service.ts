import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { NavButton } from 'public/data-struct-definition';

@Injectable({
    providedIn: 'root'
})
export class ButlerService {
    private button_list_data = new BehaviorSubject<NavButton[]>(null);

    constructor(
        private _http: HttpClient,
    ) { }

    set button_list(value: NavButton[]) {
        this.button_list_data.next(value);
    }

    get button_list(): NavButton[] {
        return this.button_list_data.value;
    }

    get button_list_subject(): BehaviorSubject<NavButton[]> {
        return this.button_list_data;
    }
}
