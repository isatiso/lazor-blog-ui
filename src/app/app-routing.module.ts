import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from 'pages/main-page/main-page.component';
import { NavbarComponent } from 'components/navbar/navbar.component';
import { EditorComponent } from 'app/pages/editor/editor.component';

const routes: Routes = [
    {
        path: 'index',
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
        loadChildren: 'pages/editor/editor.module#EditorModule',
    },
    {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
