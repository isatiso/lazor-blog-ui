import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserManagementComponent } from './user-management.component';
import { MatCardModule, MatSelectModule, MatFormFieldModule } from '@angular/material';
import { FormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        RouterModule.forRoot([]),
    ],
    declarations: [UserManagementComponent]
})
export class UserManagementModule { }
