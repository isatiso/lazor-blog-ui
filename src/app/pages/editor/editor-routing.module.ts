import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component';
import { NavbarComponent } from 'app/components/navbar/navbar.component';

const routes: Routes = [
    {
        path: ':id',
        component: EditorComponent,
        children: [
            {
                path: '',
                component: NavbarComponent,
                outlet: 'banner'
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EditorRoutingModule { }
