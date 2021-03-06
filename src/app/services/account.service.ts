import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { NoticeService } from 'services/notice.service';
import { Account } from 'public/data-struct-definition';
import { LazorBlogApi } from 'app/public/api-definition';
import { StorageService } from 'app/services/storage.service';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    current_user = new BehaviorSubject<Account>(null);
    user_list = new BehaviorSubject<Account[]>(null);
    private _api = new LazorBlogApi();

    public pattern = {
        email: /^([\w-.]+)@([\w-]+)(\.([\w-]+))+$/,
        password: /^[0-9A-Za-z`~!@#$%^&*()_+\-=\{\}\[\]:;"'<>,.\\|?/ ]{6,24}$/,
        nickname: /^[\w\-\u4e00-\u9fa5]{1,12}$/,
    };

    constructor(
        private _http: HttpClient,
        private _router: Router,
        private _route: ActivatedRoute,
        private _notice: NoticeService,
        private _storage: StorageService
    ) { }

    update_user_info() {
        this._http.get(this._api.guard_auth()).subscribe(
            res => {
                if (!res['status']) { this.current_user.next(res['data']); }
            });
    }

    log_in(data) {
        data.name = data.name.trim();
        this._http.post(this._api.auth(), data).subscribe(
            res => {
                if (!res['status']) {
                    this.current_user.next(res['data']);
                    this._router.navigate([this._route.snapshot.queryParams['backurl'] || '/main/home']);
                } else if (res['status'] === 3002) {
                    this._notice.bar('Inactivated account, connect author to active your account.', 'OK');
                    return false;
                } else {
                    this._notice.bar(res['msg'], 'OK');
                    return false;
                }
            });
    }

    log_out() {
        this._http.delete(this._api.auth()).subscribe(
            res => {
                this.current_user.next(null);
                this._storage.sclear();
                this._router.navigate(['/main/auth']);
            });
    }

    get_user_list() {
        this._http.get(this._api.user_list()).subscribe(
            res => {
                if (!res['status']) {
                    this.user_list.next(res['data']);
                }
            });
    }

    // update_username(username) {
    //     this._http.post(
    //         '/middle/user/profile',
    //         { name: username }
    //     ).subscribe(
    //         res => {
    //             if (!res['result']) {
    //                 if (res['status'] === 3004) {
    //                     this._notice.bar('User name exists. Please choose another.');
    //                 }
    //             } else {
    //                 this.data.user_name = username;
    //                 window.localStorage.setItem('user_name', username);
    //                 this._notice.bar('Successfully.');
    //             }
    //         },
    //         error => {

    //         });
    // }



    // check_log() {
    //     this._http.get('/middle/guard/auth').subscribe(
    //         data => {
    //             if (data['result'] === 1) {
    //                 window.localStorage.setItem('user_name', data['data']['user_name']);
    //                 this.data = data['data'];
    //                 this._router.navigate(['/home']);
    //             }
    //         },
    //     );
    // }



    // sign_up(data, callback: (res: boolean) => any) {
    //     data.email = data.email.trim();

    //     let message = '';
    //     let not_regular = null;
    //     if (!data.email.match(this.pattern.email)) {
    //         message = 'Invalid Email.';
    //         not_regular = true;
    //     } else if (!data.password.match(this.pattern.password)) {
    //         message = 'Invalid Password.';
    //         not_regular = true;
    //     }
    //     if (not_regular) {
    //         this._notice.bar(message, 'OK');
    //         return false;
    //     }
    //     this._http.put(
    //         '/middle/user',
    //         {
    //             username: data.username,
    //             email: data.email,
    //             password: data.password
    //         }).subscribe(
    //             res => {
    //                 if (res['result'] === 1) {
    //                     this._notice.bar('Sign Up Successfully.', 'OK');
    //                     // this.tab_select = 0;
    //                 } else {
    //                     this._notice.bar(res['msg'], 'OK');
    //                     return false;
    //                 }
    //             });
    // }

    // relogin() {
    //     this._notice.input({
    //         input_list: [{
    //             name: 'email_or_name',
    //             placeholder: '邮箱/用户名',
    //             value: '',
    //             required: true,
    //         }, {
    //             name: 'password',
    //             placeholder: '密码',
    //             value: '',
    //             required: true,
    //             type: 'password'
    //         }]
    //     }, res => {
    //         if (!res) { return; }
    //         this._http.post(
    //             '/middle/user',
    //             {
    //                 name: res.email_or_name.value,
    //                 password: res.password.value
    //             }).subscribe(
    //                 data => {
    //                     if (data['result'] === 1) {
    //                         this.data = data['data'];
    //                         this._notice.bar('登陆成功，请重新进行保存操作', 'OK');
    //                     } else if (data['status'] === 3002) {
    //                         this._notice.bar('账户未激活，联系作者以激活账户', 'OK');
    //                     } else {
    //                         this._notice.bar(data['msg'], 'OK');
    //                     }
    //                 });
    //     }).subscribe();
    // }

    // modify_password(old_pass, new_pass) {
    //     this._http.post(
    //         '/middle/user/password',
    //         {
    //             old_pass: old_pass,
    //             new_pass: new_pass,
    //         }
    //     ).subscribe(
    //         res => {
    //             if (res['result']) {
    //                 this.log_out();
    //                 this._notice.bar('Your password has changed, please re-login.');
    //             } else {
    //                 this._notice.bar(res['msg']);
    //             }
    //         });
    // }


}
