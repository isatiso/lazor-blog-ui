import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ArticleComponent } from './article.component';
import { MatProgressSpinnerModule, MatDividerModule } from '@angular/material';
import { MarkdownModule } from 'app/public/markdown/markdown.module';

@NgModule({
    imports: [
        CommonModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MarkdownModule,
        RouterModule.forChild([])
    ],
    declarations: [ArticleComponent]
})
export class ArticleModule { }
