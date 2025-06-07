import {
    InMemoryScrollingOptions,
    RouterConfigOptions,
    Routes,
} from '@angular/router';
import { AuthGuard, NotAuthGuard, NotFoundComponent } from 'spiderly';
import { LayoutComponent } from './business/layout/layout.component';

export const routes: Routes = [
    {
        path: '', 
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
                canActivate: [AuthGuard]
            },
            {
                path: '',
                loadChildren: () => import('./pages/appointment/appointment.module').then(m => m.AppointmentModule),
                canActivate: [AuthGuard]
            },
            { 
                path: 'administration',
                loadChildren: () => import('./pages/administration/administration.module').then(m => m.AdministrationModule),
                canActivate: [AuthGuard]
            },
            { 
                path: '',
                loadChildren: () => import('./pages/notification/notification.module').then(m => m.NotificationModule),
                canActivate: [AuthGuard]
            },
            {
                path: 'service',
                loadComponent: () => import('./pages/service/service-table.component').then(c => c.ServiceTableComponent),
                canActivate: [AuthGuard],
            },
            {
                path: 'service/:id', // :id is mandatory
                loadComponent: () => import('./pages/service/service-details.component').then(c => c.ServiceDetailsComponent),
                canActivate: [AuthGuard],
            },

        ],
    },
    {
        path: 'login',
        loadComponent: () => import('spiderly').then((m) => m.LoginComponent),
        canActivate: [NotAuthGuard],
    },
    {
        path: 'registration',
        loadComponent: () =>
            import('spiderly').then((m) => m.RegistrationComponent),
        canActivate: [NotAuthGuard],
    },
    {
        path: '',
        children: [
            {
                path: '',
                loadChildren: () =>
                    import('./pages/legal/legal.module').then(
                        (m) => m.LegalModule
                    ),
            },
        ],
    },
    { path: 'not-found', component: NotFoundComponent },
    { path: '**', redirectTo: 'not-found' },
];
    
export const scrollConfig: InMemoryScrollingOptions = {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
};

export const routerConfigOptions: RouterConfigOptions = {
    onSameUrlNavigation: 'reload',
};
