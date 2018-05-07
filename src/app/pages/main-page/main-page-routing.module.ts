import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPageComponent } from './main-page.component';

import { NavbarComponent } from 'components/navbar/navbar.component';
import { ContentComponent } from 'components/content/content.component';
import { FooterComponent } from 'components/footer/footer.component';
import { HomeComponent } from 'pages/main-page/home/home.component';
import { ArticleComponent } from 'pages/main-page/article/article.component';
import { AboutComponent } from 'pages/main-page/about/about.component';

const routes: Routes = [
    {
        path: '',
        component: MainPageComponent,
        children: [
            { path: '', component: NavbarComponent, outlet: 'navbar' },
            { path: '', component: FooterComponent, outlet: 'footer' },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home', component: HomeComponent,
                // children: [
                //     { path: '', component: FooterComponent, outlet: 'footer' }
                // ]
            },
            {
                path: 'article', component: ArticleComponent,
                children: [
                    { path: '', component: ContentComponent, outlet: 'content' },

                ]
            },
            {
                path: 'about', component: AboutComponent,
                children: [
                    { path: '', component: ContentComponent, outlet: 'content' },
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
