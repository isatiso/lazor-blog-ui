import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'la-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
    title = '标题';
    content = `
## article works!
## article works!
## article works!
## article works!
## article works!
## article works!
## article works!
## article works!
## article works!`;
    constructor() { }


    ngOnInit() {
    }

}
