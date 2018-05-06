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

import { NavbarRoutingModule } from './navbar-routing.module';
import { NavbarComponent } from './navbar.component';

@NgModule({
  imports: [
    CommonModule,
    NavbarRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDividerModule
  ],
  declarations: [NavbarComponent]
})
export class NavbarModule { }
