import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatDividerModule } from '@angular/material';
import { ContentComponent } from './content.component';
import { MarkdownModule } from 'public/markdown/markdown.module';


@NgModule({
    imports: [
        CommonModule,
        MarkdownModule,
        MatDividerModule,
        RouterModule.forChild([])
    ],
    declarations: [ContentComponent]
})
export class ContentModule { }
