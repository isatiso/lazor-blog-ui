import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './index.component';
import { BannerComponent } from 'components/banner/banner.component';
import { FooterComponent } from 'components/footer/footer.component';

const routes: Routes = [
    {
        path: '',
        component: IndexComponent,
        pathMatch: 'full',
        children: [
            {
                path: '',
                component: BannerComponent,
                outlet: 'banner'
            },
            {
                path: '',
                component: FooterComponent,
                outlet: 'footer'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class IndexRoutingModule { }
