import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDividerModule
} from '@angular/material';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavbarModule } from '../navbar/navbar.module';

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        NavbarModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatMenuModule,
        MatDividerModule
    ],
    declarations: [HomeComponent]
})
export class HomeModule { }
