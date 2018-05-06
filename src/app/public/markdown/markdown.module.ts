import { NgModule } from '@angular/core';
import { MarkdownDirective } from 'directives/markdown.directive';

@NgModule({
    declarations: [
        MarkdownDirective
    ],
    exports: [
        MarkdownDirective
    ]
})
export class MarkdownModule { }
