import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';

import { NavbarModule } from 'components/navbar/navbar.module';
import { ContentModule } from 'components/content/content.module';
import { FooterModule } from 'components/footer/footer.module';
import { HomeModule } from 'pages/main-page/home/home.module';
import { ArticleModule } from 'pages/main-page/article/article.module';
import { AboutModule } from 'pages/main-page/about/about.module';
import { AuthModule } from 'pages/main-page/auth/auth.module';
import { ButlerModule } from 'app/components/butler/butler.module';

@NgModule({
    imports: [
        CommonModule,
        MainPageRoutingModule,
        HomeModule,
        ArticleModule,
        AboutModule,
        AuthModule,
        NavbarModule,
        ContentModule,
        ButlerModule,
        FooterModule
    ],
    declarations: [MainPageComponent]
})
export class MainPageModule { }
