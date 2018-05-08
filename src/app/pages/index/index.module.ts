import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule
} from '@angular/material';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { BannerModule } from 'components/banner/banner.module';
import { FooterModule } from 'components/footer/footer.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IndexRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        BannerModule,
        FooterModule
    ],
    declarations: [IndexComponent]
})
export class IndexModule { }
