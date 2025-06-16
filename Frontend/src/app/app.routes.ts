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
            
            {
                path: 'patient-document', // URL for the list page (e.g., /your-entity-name)
                loadComponent: () => import('./pages/patient-document/patient-document-table.component').then(c => c.PatientDocumentTableComponent),
                canActivate: [AuthGuard],
            },
            {
                path: 'patient-document/:id', // URL for the details page (e.g., /your-entity-name/123)
                loadComponent: () => import('./pages/patient-document/patient-document-details.component').then(c => c.PatientDocumentDetailsComponent),
                canActivate: [AuthGuard],
            },
            
            {
                path: 'disease', // URL for the list page (e.g., /your-entity-name)
                loadComponent: () => import('./pages/disease/disease-table.component').then(c => c.DiseaseTableComponent),
                canActivate: [AuthGuard],
            },
            {
                path: 'disease/:id', // URL for the details page (e.g., /your-entity-name/123)
                loadComponent: () => import('./pages/disease/disease-details.component').then(c => c.DiseaseDetailsComponent),
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
