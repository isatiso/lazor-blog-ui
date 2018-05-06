import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule
} from '@angular/material';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { MarkdownModule } from 'public/markdown/markdown.module';

@NgModule({
    imports: [
        CommonModule,
        MarkdownModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatDividerModule,
        ArticleRoutingModule
    ],
    declarations: [ArticleComponent]
})
export class ArticleModule { }
