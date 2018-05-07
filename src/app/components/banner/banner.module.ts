import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BannerComponent } from './banner.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([])
    ],
    declarations: [BannerComponent]
})
export class BannerModule { }
