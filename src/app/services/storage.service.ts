import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor() { }

    swrite(key, value) { window.sessionStorage.setItem(key, value); }
    sread(key) { return window.sessionStorage.getItem(key); }
    sremove(key) { window.sessionStorage.removeItem(key); }
    sclear() { window.sessionStorage.clear(); }

    lwrite(key, value) { window.localStorage.setItem(key, value); }
    lread(key) { return window.localStorage.getItem(key); }
    lremove(key) { window.localStorage.removeItem(key); }
}
