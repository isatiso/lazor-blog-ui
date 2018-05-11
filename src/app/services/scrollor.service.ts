import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ScrollorService {

    constructor() { }


    goto_top(event?) {
        let total_height = document.scrollingElement.scrollTop;
        const delta = total_height / 15;
        if (total_height > 0) {
            const interval_handler = setInterval(() => {
                total_height -= delta;
                document.scrollingElement.scrollTop = total_height;
                if (total_height <= 0) {
                    clearInterval(interval_handler);
                }
            }, 15);
        }
    }

    goto_bottom(event?) {
        const scroll_height = document.scrollingElement.scrollHeight;
        const client_height = document.scrollingElement.clientHeight;
        const scroll_range = scroll_height - client_height;
        let total_height = document.scrollingElement.scrollTop;
        const delta = (scroll_range - total_height) / 15;
        if (total_height < scroll_range) {
            const interval_handler = setInterval(() => {
                total_height += delta;
                document.scrollingElement.scrollTop = total_height;
                if (total_height >= scroll_range) {
                    clearInterval(interval_handler);
                }
            }, 15);
        }
    }

    goto(from, to, steps: number = 15) {

        if (from > to) {
            const delta = (from - to) / steps;
            if (from > to) {
                const interval_handler = setInterval(() => {
                    from -= delta;
                    document.scrollingElement.scrollTop = from;
                    if (from <= to) {
                        clearInterval(interval_handler);
                    }
                }, 15);
            }
        } else if (from < to) {
            const delta = (to - from) / steps;
            if (from < to) {
                const interval_handler = setInterval(() => {
                    from += delta;
                    document.scrollingElement.scrollTop = from;
                    if (from >= to) {
                        clearInterval(interval_handler);
                    }
                }, 15);
            }
        }
    }
}
