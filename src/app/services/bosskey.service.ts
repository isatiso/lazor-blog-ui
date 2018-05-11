import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BosskeyService {
    actions = Object.create(null);

    constructor() { }

    shoot(event?) {
        if (event.ctrlKey && event.key in this.actions) {
            this.actions[event.key]();
            event.preventDefault();
        }
        return event;
    }

    extend(actions: object) {
        this.actions = Object.assign(this.actions, actions);
    }

    cover(actions: object) {
        this.actions = Object.assign(Object.create(null), actions);
    }

    clear() {
        this.actions = Object.create(null);
    }
}
