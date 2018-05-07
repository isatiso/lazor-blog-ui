import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContentService {
    title: BehaviorSubject<string>;
    content: BehaviorSubject<string>;

    constructor() {
        this.title = new BehaviorSubject<string>('');
        this.content = new BehaviorSubject<string>('');
    }
}
