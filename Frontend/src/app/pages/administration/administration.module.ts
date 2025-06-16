import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';
import { NotificationBaseDetailsComponent, UserExtendedBaseDetailsComponent } from 'src/app/business/components/base-details/business-base-details.generated';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpiderlyDataTableComponent, SpiderlyControlsModule, CardSkeletonComponent, RoleBaseDetailsComponent } from 'spiderly';
import { NotificationDetailsComponent } from './pages/notification/notification-details.component';
import { NotificationTableComponent } from './pages/notification/notification-table.component';
import { RoleDetailsComponent } from './pages/role/role-details.component';
import { RoleTableComponent } from './pages/role/role-table.component';
import { UserDetailsComponent } from './pages/user/user-details.component';
import { UserTableComponent } from './pages/user/user-table.component';

const routes: Routes = [
    {
        path: 'users',
        component: UserTableComponent,
    },
    {
        path: 'users/:id',
        component: UserDetailsComponent,
    },
    {
        path: 'roles',
        component: RoleTableComponent,
    },
    {
        path: 'roles/:id',
        component: RoleDetailsComponent,
    },
    {
        path: 'notifications',
        component: NotificationTableComponent,
    },
    {
        path: 'notifications/:id',
        component: NotificationDetailsComponent,
    },
];

@NgModule({
    imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SpiderlyDataTableComponent,
    SpiderlyControlsModule,
    CardSkeletonComponent,
    TranslocoDirective,
    NotificationBaseDetailsComponent,
    UserExtendedBaseDetailsComponent,
    RoleBaseDetailsComponent,
],
declarations: [
        UserTableComponent,
        UserDetailsComponent, 
        RoleTableComponent,
        RoleDetailsComponent,
        NotificationTableComponent,
        NotificationDetailsComponent,
    ],
    providers:[]
})
export class AdministrationModule { }

