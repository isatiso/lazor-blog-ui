import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: 'index',
        loadChildren: './pages/index/index.module#IndexModule',
        pathMatch: 'full',
    },
    {
        path: 'main',
        loadChildren: './pages/main-page/main-page.module#MainPageModule',
    },
    {
        path: '',
        redirectTo: 'main/home',
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {enableTracing: true})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
