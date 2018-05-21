import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorComponent } from './editor.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule, MatButtonModule, MatDividerModule, MatSelectModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { MarkdownModule } from 'app/public/markdown/markdown.module';
import { NavbarModule } from 'app/components/navbar/navbar.module';
import { EditorRoutingModule } from 'app/pages/editor/editor-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NavbarModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule,
        MatTooltipModule,
        MatSelectModule,
        MarkdownModule,
        EditorRoutingModule
    ],
    declarations: [EditorComponent]
})
export class EditorModule { }
