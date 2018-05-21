import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleDataService } from 'app/services/database/article-data.service';
import { BosskeyService } from 'app/services/bosskey.service';
import { CategoryDataService } from 'app/services/database/category-data.service';
import { Options } from 'app/public/data-struct-definition';
import { NoticeService } from 'app/services/notice.service';
import { HttpRequest, HttpClient, HttpResponse, HttpEventType } from '@angular/common/http';

@Component({
    selector: 'la-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    content_data = 'aefaefaef';
    render_latex = 1;
    modified = false;
    timer = null;
    process_state = null;

    current_data = {
        title: '',
        content: '',
        category_id: '',
        article_id: ''
    };

    @ViewChild('editor') editor;
    @ViewChild('imageForm') image_form;
    @ViewChild('imageUpload') image_upload;
    @ViewChild('contentRef') content_ref;

    constructor(
        private _notice: NoticeService,
        private _route: ActivatedRoute,
        private _router: Router,
        private _http: HttpClient,
        private _article: ArticleDataService,
        public category: CategoryDataService,
        public bosskey: BosskeyService,
    ) { }

    get content() {
        return this.current_data.content;
    }

    set content(value) {
        clearTimeout(this.timer);
        this.modified = true;
        this.current_data.content = value;
        this.timer = setTimeout(() => { this.render_latex++; }, 400);
    }

    get title() {
        return this.current_data.title;
    }

    set title(value) {
        this.modified = true;
        this.current_data.title = value;
    }

    get category_id() {
        return this.current_data.category_id;
    }

    set category_id(value) {
        this.modified = true;
        this.current_data.category_id = value;
    }

    private _tool = {
        split_content(content, pl, pr?) {
            pr = pr || pl;
            return [content.slice(0, pl), '', content.slice(pl, pr), '', content.slice(pr)];
        },

        concat_content(content_arr, pos1, pos3?) {
            pos3 = pos3 || '';
            content_arr[1] = pos1;
            content_arr[3] = pos3;
            return content_arr.join('');
        },
    };

    go_article() {
        this._router.navigate(['/main/article/' + this.current_data.article_id]);
    }

    save_article() {
        if (this.modified) {
            this._article.save(this.current_data);
            this.modified = false;
        }
    }

    click_upload_button(event?) {
        this.image_upload.nativeElement.click();
        return false;
    }

    set_boss_key() {
        this.bosskey.cover({
            // ArrowUp: this.action.go_top,
            // ArrowDown: this.action.go_bottom,
            // e: this.action.go_editor,
            // 0: this.action.go_home,
            s: () => { this.save_article(); },
            p: () => { this.click_upload_button(); }
        });
    }
    ngOnInit() {
        this.set_boss_key();
        this.current_data.article_id = this._route.params['value']['id'];
        this.category.get_categories(new Options({ flush: true }));
        this._article.get_article(this.current_data.article_id).subscribe(
            value => {
                this.current_data.title = value.title;
                this.current_data.content = value.content;
                this.current_data.category_id = value.category_id;
                this.render_latex++;
            });
    }

    upload_file(event) {

        if (this.image_upload.nativeElement.files.length > 15) {
            this._notice.bar('最多同时上传 15 个文件');
            return false;
        }

        // this._article_db.article_status = 'modified';

        const file = new FormData(this.image_form.nativeElement);
        this.image_upload.nativeElement.value = '';

        const req = new HttpRequest('POST', '/middle/image', file, {
            reportProgress: true,
        });

        // this.progress_bar.color = 'primary';
        // this.progress_state = 'active';

        this._http.request(req).subscribe(
            next => {
                if (next.type === HttpEventType.UploadProgress) {
                    this.process_state = true;
                    // this.progress_rate = Math.round(100 * next.loaded / next.total);
                } else if (next instanceof HttpResponse) {
                    const e = this.content_ref.nativeElement.selectionEnd;
                    const text = next.body['data']['file_list'].map(fp => {
                        return `![${fp['name']}](https://lazor.cn${fp['path']} "${fp['name']}")\n`;
                    }).join('');

                    this.content = this._tool.concat_content(
                        this._tool.split_content(
                            this.content,
                            e), text);

                    this.process_state = false;
                    setTimeout(() => {
                        this.content_ref.nativeElement.setSelectionRange(e + text.length, e + text.length);
                        // this.progress_rate = 0;
                        // this.progress_bar.color = 'accent';
                    }, 0);
                } else {
                    console.log(next);
                }
            },
            error => {
            }
        );
    }

}
