import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './main-page.component';

import { NavbarComponent } from 'components/navbar/navbar.component';
import { ContentComponent } from 'components/content/content.component';
import { FooterComponent } from 'components/footer/footer.component';
import { HomeComponent } from 'pages/main-page/home/home.component';
import { ArticleComponent } from 'pages/main-page/article/article.component';
import { AboutComponent } from 'pages/main-page/about/about.component';
import { AuthComponent } from 'app/pages/main-page/auth/auth.component';
import { AuthGuard } from 'app/guards/auth.guard';
import { ButlerComponent } from 'app/components/butler/butler.component';
import { UserManagementComponent } from 'app/pages/main-page/user-management/user-management.component';
import { SupervisorGuard } from 'app/guards/supervisor.guard';
import { CategoryComponent } from 'app/pages/main-page/category/category.component';
import { AlreadyAuthGuard } from 'app/guards/already-auth.guard';
// import { EditorComponent } from 'app/pages/main-page/editor/editor.component';

const routes: Routes = [
    {
        path: 'main',
        component: MainPageComponent,
        children: [
            { path: '', component: NavbarComponent, outlet: 'navbar' },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home', component: HomeComponent,
                canActivate: [AuthGuard],
                children: [
                    { path: '', component: ButlerComponent, outlet: 'butler' },
                    { path: '', component: FooterComponent, outlet: 'footer' },
                ]
            },
            {
                path: 'auth',
                canActivate: [AlreadyAuthGuard],
                component: AuthComponent,
            },
            {
                path: 'user-management', component: UserManagementComponent,
                canActivate: [SupervisorGuard],
                children: [
                    { path: '', component: FooterComponent, outlet: 'footer' },
                ]
            },
            {
                path: 'article/:id', component: ArticleComponent,
                children: [
                    { path: '', component: ButlerComponent, outlet: 'butler' },
                    { path: '', component: ContentComponent, outlet: 'content' },
                    { path: '', component: FooterComponent, outlet: 'footer' },
                ]
            },
            {
                path: 'category/:id', component: CategoryComponent,
                children: [
                    { path: '', component: ButlerComponent, outlet: 'butler' },
                    { path: '', component: FooterComponent, outlet: 'footer' },
                ]
            },
            // {
            //     path: 'editor/:id', component: EditorComponent,
            //     children: [
            //         // { path: '', component: ContentComponent, outlet: 'content' },
            //         { path: '', component: ButlerComponent, outlet: 'butler' },
            //         { path: '', component: FooterComponent, outlet: 'footer' },
            //     ]
            // },
            {
                path: 'about', component: AboutComponent,
                children: [
                    { path: '', component: ContentComponent, outlet: 'content' },
                    { path: '', component: FooterComponent, outlet: 'footer' },
                ]
            },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainPageRoutingModule { }
