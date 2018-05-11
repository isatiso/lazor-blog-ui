import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule, MatButtonModule, MatTooltipModule } from '@angular/material';

import { ButlerRoutingModule } from './butler-routing.module';
import { ButlerComponent } from './butler.component';

@NgModule({
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        ButlerRoutingModule
    ],
    declarations: [ButlerComponent],
    exports: [
        ButlerComponent
    ]
})
export class ButlerModule { }
