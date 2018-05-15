import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import {
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDividerModule,
    MatProgressSpinnerModule
} from '@angular/material';

import { HomeComponent } from './home.component';
import { SortablejsModule } from 'angular-sortablejs/dist';

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        RouterModule.forChild([]),
        SortablejsModule.forRoot({})
    ],
    declarations: [HomeComponent]
})
export class HomeModule { }
