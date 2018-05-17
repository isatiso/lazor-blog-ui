import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './user.component';
import { RouterModule } from '@angular/router';
import { MatCardModule, MatProgressSpinnerModule, MatDividerModule } from '@angular/material';

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        MatDividerModule,
        MatProgressSpinnerModule,
        RouterModule.forChild([])
    ],
    declarations: [UserComponent]
})
export class UserModule { }
