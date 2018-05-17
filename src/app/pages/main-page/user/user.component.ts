import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountService } from 'app/services/account.service';
import { CategoryDataService } from 'app/services/database/category-data.service';
import { BosskeyService } from 'app/services/bosskey.service';
import { ScrollorService } from 'app/services/scrollor.service';
import { ButlerService } from 'app/services/components/butler.service';
import { ArticleDataService } from 'app/services/database/article-data.service';
import { NoticeService } from 'app/services/notice.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserCategoryDataService } from 'app/services/database/user-category-data.service';
import { UserService } from 'app/services/user.service';

@Component({
    selector: 'la-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    load_article = 0;
    user_id = '';
    constructor(
        public account: AccountService,
        public category: CategoryDataService,
        public bosskey: BosskeyService,
        public user_category: UserCategoryDataService,
        public user_data: UserService,
        private _route: ActivatedRoute,
        private _scroller: ScrollorService,
        private _article: ArticleDataService,
        private _butler: ButlerService,
        private _notice: NoticeService,
        private _router: Router
    ) { }

    @ViewChild('topSpacer') top_spacer;
    @ViewChild('bottomSpacer') bottom_spacer;

    ngOnInit() {
        this.user_id = this._route.params['value']['id'];
        console.log(this.user_id);
        document.body.style.backgroundColor = '#f0f0f0';
        this.user_data.get_user(this.user_id);
        this.user_category.get_categories(this.user_id);
        this.top_spacer.nativeElement.style.height = '3rem';
        this.bottom_spacer.nativeElement.style.height = '3rem';
        setTimeout(() => {
            this.load_article = 1;
        }, 0);
    }

    get articles_num() {
        if (!this.user_category.articles.value) {
            return 0;
        } else {
            return this.user_category.articles.value.length;
        }
    }

    set_current_category(category) {
        const status = category.show_options;
        for (const cate of this.user_category.categories.value) {
            cate.show_options = 'none';
        }
        if (!this.is_current(category)) {
            category.show_options = 'current';
            this.user_category.get_articles(category);
        } else {
            category.show_options = status === 'options' ? 'current' : 'options';
        }
    }

    is_current(category) {
        return this.user_category.is_current(category);
    }

}
