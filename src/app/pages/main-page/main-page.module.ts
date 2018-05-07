import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';

import { NavbarModule } from 'components/navbar/navbar.module';
import { ContentModule } from 'components/content/content.module';
import { FooterModule } from 'components/footer/footer.module';
import { HomeModule } from 'pages/main-page/home/home.module';
import { ArticleModule } from 'app/pages/main-page/article/article.module';
import { AboutModule } from 'app/pages/main-page/about/about.module';

@NgModule({
    imports: [
        CommonModule,
        MainPageRoutingModule,
        HomeModule,
        ArticleModule,
        AboutModule,
        NavbarModule,
        ContentModule,
        FooterModule
    ],
    declarations: [MainPageComponent]
})
export class MainPageModule { }