import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { AppointmentBaseDetailsComponent } from 'src/app/business/components/base-details/business-base-details.generated';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule, SpiderlyDataTableComponent, SpiderlyControlsModule, CardSkeletonComponent, RoleBaseDetailsComponent } from 'spiderly';
import { AppointmentDetailsComponent } from './appointment-details.component';
import { AppointmentTableComponent } from './appointment-table.component';


const routes: Routes = [
    {
        path: 'appointments',
        component: AppointmentTableComponent,
    },
    {
        path: 'appointments/:id',
        component: AppointmentDetailsComponent,
    },
    
];

@NgModule({
    imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    SpiderlyDataTableComponent,
    SpiderlyControlsModule,
    CardSkeletonComponent,
    TranslocoDirective,
    AppointmentBaseDetailsComponent,
    
],
declarations: [
        AppointmentTableComponent,
        AppointmentDetailsComponent, 
    ],
    providers:[]
})
export class AppointmentModule { }

