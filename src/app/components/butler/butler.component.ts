import { Component, Input, OnInit, OnChanges, ViewChild, ViewChildren } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { NavButton } from 'public/data-struct-definition';
import { ButlerService } from 'app/services/components/butler.service';

declare var anime: any;

@Component({
    selector: 'la-butler',
    templateUrl: './butler.component.html',
    styleUrls: ['./butler.component.scss']
})
export class ButlerComponent implements OnInit {

    public menu_anime_handler: any;
    public menu_anime_state = 'hidden';
    public button_list: NavButton[];
    public expand_width: string;

    @ViewChild('container') container;
    @ViewChild('navGuideIcon') nav_guide_icon;
    @ViewChildren('navOption') nav_options;

    constructor(
        private _butler: ButlerService,
    ) { }

    ngOnInit() {
        this._butler.button_list_subject.subscribe(value => {
            this.button_list = value;
            this.menu_anime_handler = null;
            if (value) { this.expand_width = value.length * 64 + 48 + 'px'; }
        });
    }

    private _init_anime() {
        this.menu_anime_handler = anime.timeline();
        this.menu_anime_handler.add({
            targets: this.nav_guide_icon._elementRef.nativeElement,
            rotate: '0.5turn',
            duration: 200,
            offset: 0,
            easing: 'linear'
        }).add({
            targets: this.container.nativeElement,
            height: this.expand_width,
            duration: 200,
            offset: 0,
            easing: 'linear'
        });
        let delta = 0;
        this.nav_options.forEach(el => {
            delta -= 64;
            this.menu_anime_handler.add({
                targets: el._elementRef.nativeElement,
                translateY: delta,
                duration: 200,
                opacity: [0, 1],
                offset: 0,
                easing: 'linear'
            });
        });
        this.menu_anime_state = 'show';
    }

    show_menu(event?) {
        if (!this.menu_anime_handler) {
            this._init_anime();
            return true;
        }

        if ('show' === this.menu_anime_state) {
            return false;
        }

        if (this.menu_anime_handler.reversed) {
            this.menu_anime_handler.reverse();
        }
        this.menu_anime_handler.play();
        this.menu_anime_state = 'show';
        return true;
    }

    hidden_menu(event?) {
        if ('hidden' === this.menu_anime_state) {
            return false;
        }

        if (!this.menu_anime_handler.reversed) {
            this.menu_anime_handler.reverse();
        }

        this.menu_anime_handler.play();
        this.menu_anime_state = 'hidden';
        return true;
    }

    toggle_menu(event?) {
        this.menu_anime_handler.play();
        this.menu_anime_handler.reverse();
        if (this.menu_anime_state === 'hidden') {
            this.menu_anime_state = 'show';
        } else {
            this.menu_anime_state = 'hidden';
        }

        return true;
    }
}
