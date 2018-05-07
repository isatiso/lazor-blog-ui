import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([])
    ],
    declarations: [AboutComponent]
})
export class AboutModule { }
