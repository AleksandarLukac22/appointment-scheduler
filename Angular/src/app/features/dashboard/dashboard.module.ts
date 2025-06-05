import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { TranslocoDirective } from '@jsverse/transloco';
import { RouterModule, Routes } from '@angular/router';
import { InfoCardComponent } from 'spiderly';
import { FullCalendarModule } from '@fullcalendar/angular';

const routes: Routes = [
    {
        path: '', 
        component: DashboardComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        TranslocoDirective,
        InfoCardComponent,
        FullCalendarModule,
    ],
    declarations: [DashboardComponent],
    providers:[]
})
export class DashboardModule { }

