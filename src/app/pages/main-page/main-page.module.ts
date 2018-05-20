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
import { UserManagementModule } from 'app/pages/main-page/user-management/user-management.module';
import { CategoryModule } from 'app/pages/main-page/category/category.module';


@NgModule({
    imports: [
        CommonModule,
        MainPageRoutingModule,
        HomeModule,
        ArticleModule,
        AboutModule,
        AuthModule,
        UserManagementModule,
        NavbarModule,
        ContentModule,
        ButlerModule,
        CategoryModule,
        FooterModule
    ],
    declarations: [MainPageComponent]
})
export class MainPageModule { }
