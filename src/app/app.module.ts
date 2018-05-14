import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatMenuModule, MatSnackBarModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageModule } from 'pages/main-page/main-page.module';
import { NavbarModule } from 'components/navbar/navbar.module';
import { PreviewModule } from 'public/preview/preview.module';
import { InputDialogModule } from 'public/input-dialog/input-dialog.module';
import { WarningModule } from 'public/warning/warning.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatMenuModule,
        MatSnackBarModule,
        MainPageModule,
        NavbarModule,
        HttpClientModule,
        PreviewModule,
        InputDialogModule,
        WarningModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
