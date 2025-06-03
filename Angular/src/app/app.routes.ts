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
                loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
                canActivate: [AuthGuard]
            },
            { 
                path: 'administration',
                loadChildren: () => import('./features/administration/administration.module').then(m => m.AdministrationModule),
                canActivate: [AuthGuard]
            },
            { 
                path: '',
                loadChildren: () => import('./features/notification/notification.module').then(m => m.NotificationModule),
                canActivate: [AuthGuard]
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
                    import('./features/legal/legal.module').then(
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
