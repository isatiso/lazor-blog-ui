import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var anime: any;

@Component({
    selector: 'la-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'la';

    get outer_width(): number {
        return window.outerWidth;
    }

    ngOnInit() {
        anime.timeline({
            targets: ['#loading-wrapper', '#cover-background'],
            opacity: 0,
            duration: 1000,
            easing: 'linear'
        }).add({
            opacity: 0,
        }).add({
            zIndex: -1,
        });
    }
    ngAfterViewInit() {
        const logo_anime_handler = anime({
            targets: '#site-logo',
            rotate: [
                { value: ['0turn', '7turn'], duration: 3000, easing: [0, 0.6, 1, 0.4] },
                { value: ['7turn', '0turn'], duration: 3000, easing: [0, 0.6, 1, 0.4] },
                { value: ['0turn', '-7turn'], duration: 3000, easing: [0, 0.6, 1, 0.4] },
                { value: ['-7turn', '7turn'], duration: 3000, easing: [0, 0.6, 1, 0.4] },
                { value: ['7turn', '0turn'], duration: 3000, easing: [0, 0.6, 1, 0.4] },
            ],
            loop: true
        });

    }
}
