import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'home',
        loadChildren: './modules/home/home.module#HomeModule',
        pathMatch: 'full',
        // canActivate: [AuthGuard],
        data: { title: 'home', scrollLimit: 0, footerType: 'normal' }
    },
    {
        path: 'article',
        loadChildren: './modules/article/article.module#ArticleModule',
        pathMatch: 'full',
        // canActivate: [AuthGuard],
        data: { title: 'article', scrollLimit: 0, footerType: 'normal' }
    },
    {
        path: 'about',
        loadChildren: './modules/about/about.module#AboutModule',
        pathMatch: 'full',
        // canActivate: [AuthGuard],
        data: { title: 'about', scrollLimit: 0, footerType: 'normal' }
    },
    {
        path: 'editor',
        loadChildren: './modules/editor/editor.module#EditorModule',
        pathMatch: 'full',
        // canActivate: [AuthGuard],
        data: { title: 'editor', scrollLimit: 0, footerType: 'normal' }
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
        data: { title: 'home', scrollLimit: 276, footerType: 'normal' }
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
