import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContentService {
    title = new BehaviorSubject<string>('');
    content = new BehaviorSubject<string>('');

    constructor() {

    }
}
