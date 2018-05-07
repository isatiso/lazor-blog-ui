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
        path: 'home',
        component: MainPageComponent,
        children: [
            {
                path: '', component: HomeComponent, outlet: 'main',
                children: [
                    { path: '', component: FooterComponent, outlet: 'footer' }
                ]
            },
            { path: '', component: NavbarComponent, outlet: 'navbar' },
        ]
    },
    // {
    //     path: 'home',
    //     component: MainPageComponent,
    //     children: [
    //         { path: '', component: NavbarComponent, outlet: 'navbar' },
    //         {
    //             path: '', component: HomeComponent, outlet: 'main',
    //             children: [
    //                 { path: '', component: FooterComponent, outlet: 'footer' }
    //             ]
    //         },
    //     ]
    // },
    // {
    //     path: 'article',
    //     component: MainPageComponent,
    //     children: [
    //         { path: '', component: NavbarComponent, outlet: 'navbar' },
    //         {
    //             path: '', component: ArticleComponent, outlet: 'main', children: [
    //                 { path: '', component: ContentComponent, outlet: 'content' },
    //                 { path: '', component: FooterComponent, outlet: 'footer' }
    //             ]
    //         },
    //     ]
    // },
    // {
    //     path: 'about',
    //     component: MainPageComponent,
    //     children: [
    //         { path: '', component: NavbarComponent, outlet: 'navbar' },
    //         {
    //             path: '', component: AboutComponent, outlet: 'main',
    //             children: [
    //                 { path: '', component: ContentComponent, outlet: 'content' },
    //                 { path: '', component: FooterComponent, outlet: 'footer' }
    //             ]
    //         },
    //     ]
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainPageRoutingModule { }
