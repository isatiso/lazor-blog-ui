import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContentService {
    title = new BehaviorSubject<string>('');
    content = new BehaviorSubject<string>('');
    create_time = new BehaviorSubject<number>(0);
    update_time = new BehaviorSubject<number>(0);

    constructor() {

    }
}
