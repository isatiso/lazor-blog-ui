import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from 'pages/main-page/main-page.component';
import { NavbarComponent } from 'components/navbar/navbar.component';
import { EditorComponent } from 'app/pages/editor/editor.component';
import { AuthGuard } from 'app/guards/auth.guard';
import { ArticleOwnerGuard } from 'app/guards/article-owner.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: 'pages/index/index.module#IndexModule',
        pathMatch: 'full',
    },
    {
        path: 'main',
        component: MainPageComponent,
        loadChildren: 'pages/main-page/main-page.module#MainPageModule',
    },
    {
        path: 'editor',
        canActivate: [ArticleOwnerGuard],
        loadChildren: 'pages/editor/editor.module#EditorModule',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
