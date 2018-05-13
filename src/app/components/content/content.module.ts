import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatDividerModule, MatProgressSpinnerModule } from '@angular/material';
import { ContentComponent } from './content.component';
import { MarkdownModule } from 'public/markdown/markdown.module';


@NgModule({
    imports: [
        CommonModule,
        MarkdownModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        RouterModule.forChild([])
    ],
    declarations: [ContentComponent]
})
export class ContentModule { }
