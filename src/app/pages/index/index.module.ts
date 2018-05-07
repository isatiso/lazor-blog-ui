import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatButtonModule,
    MatCardModule
} from '@angular/material';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { BannerModule } from 'components/banner/banner.module';
import { FooterModule } from 'components/footer/footer.module';

@NgModule({
    imports: [
        CommonModule,
        IndexRoutingModule,
        MatButtonModule,
        MatCardModule,
        BannerModule,
        FooterModule
    ],
    declarations: [IndexComponent]
})
export class IndexModule { }
