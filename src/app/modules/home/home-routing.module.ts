import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { NavbarComponent } from '../navbar/navbar.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
        children: [
            {
                path: '',
                component: NavbarComponent,
                outlet: 'navbar'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
