export class LazorBlogApi {
    auth() { return '/middle/auth'; }
    user() { return '/middle/user'; }
    user_profile() { return '/middle/user/profile'; }
    user_password() { return '/middle/user/password'; }
    user_list() { return '/middle/user_list'; }
    category() { return '/middle/category'; }
    category_order() { return '/middle/category/order'; }
    article() { return '/middle/article'; }
    article_list() { return '/middle/article/list'; }
    article_latest() { return '/middle/article/latest'; }
    article_order() { return '/middle/article/order'; }
    guard_auth() { return '/middle/guard/auth'; }
    guard_owner() { return '/middle/guard/owner'; }
    guard_supervisor() { return '/middle/guard/supervisor'; }
    file() { return '/middle/file'; }
    image() { return '/middle/image'; }
    record(record_id) { return `/middle/image/record/${record_id}`; }
}
