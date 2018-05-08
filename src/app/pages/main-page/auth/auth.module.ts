import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
    MatTabsModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDividerModule
} from '@angular/material';

import { AuthComponent } from './auth.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatTabsModule,
        MatInputModule,
        MatButtonModule,
        MatDividerModule,
        MatFormFieldModule,
        MatIconModule,
        RouterModule.forChild([])
    ],
    declarations: [AuthComponent]
})
export class AuthModule { }
