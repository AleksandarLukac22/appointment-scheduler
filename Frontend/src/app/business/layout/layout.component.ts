import { TranslocoService } from '@jsverse/transloco';
import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/business/services/auth/auth.service';
import { ConfigService } from 'src/app/business/services/config.service';
import { Subscription } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FooterComponent, AppSidebarComponent,  LayoutBaseService,  SpiderlyMenuItem, SpiderlyLayoutComponent} from 'spiderly';
import { CommonModule } from '@angular/common';
import { BusinessPermissionCodes } from '../enums/business-enums.generated';
import { SecurityPermissionCodes } from 'spiderly';

@Component({
    selector: 'layout',
    templateUrl: './layout.component.html',
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        FooterComponent,
        SpiderlyLayoutComponent
    ]
})
export class LayoutComponent  implements OnInit {
    menu: SpiderlyMenuItem[];

    constructor(
        private authService: AuthService,
        private config: ConfigService,
        private translocoService: TranslocoService
    ) {
        
    }

    ngOnInit(): void {
        this.menu = [
            {
                visible: true,
                items: [
                    { 
                        label: this.translocoService.translate('Home'), 
                        icon: 'pi pi-fw pi-home', 
                        routerLink: [''],
                        visible: true,
                    },
                    { 
                        label: this.translocoService.translate('Appointment'), 
                        icon: 'pi pi-fw pi-calendar-plus', 
                        routerLink: ['appointments'],
                        visible: true,
                    },
                    
                    { 
                        label: this.translocoService.translate('PatientDocument'), 
                        icon: 'pi pi-fw pi-question', // Refer to https://primeng.org/icons#list for available icons
                        routerLink: ['patient-document'], // Must match the list page path defined in app.routes.ts
                        visible: true,
                    },
                    { 
                        label: this.translocoService.translate('Disease'), 
                        icon: 'pi pi-fw pi-question', // Refer to https://primeng.org/icons#list for available icons
                        routerLink: ['disease'], // Must match the list page path defined in app.routes.ts
                        visible: true,
                    },

                    {
                        label: this.translocoService.translate('Administration'),
                        icon: 'pi pi-fw pi-cog',
                        visible: true,
                        hasPermission: (permissionCodes: string[]): boolean => { 
                            return (
                                permissionCodes?.includes(BusinessPermissionCodes.ReadUserExtended) ||
                                permissionCodes?.includes(SecurityPermissionCodes.ReadRole) ||
                                permissionCodes?.includes(BusinessPermissionCodes.ReadNotification)
                            )
                        },
                        


                        items: [
                            
                            { 
                                label: this.translocoService.translate('Service'), 
                                icon: 'pi pi-fw pi-wrench', // https://primeng.org/icons#list
                                routerLink: ['service'],
                                visible: true,
                            },
                            {
                                label: this.translocoService.translate('UserList'),
                                icon: 'pi pi-fw pi-user',
                                routerLink: [`/${this.config.administrationSlug}/users`],
                                hasPermission: (permissionCodes: string[]): boolean => { 
                                    return (
                                        permissionCodes?.includes(BusinessPermissionCodes.ReadUserExtended)
                                    )
                                },
                                visible: true,
                            },
                            {
                                label: this.translocoService.translate('RoleList'),
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: [`/${this.config.administrationSlug}/roles`],
                                hasPermission: (permissionCodes: string[]): boolean => { 
                                    return (
                                        permissionCodes?.includes(SecurityPermissionCodes.ReadRole)
                                    )
                                },
                                visible: true,
                            },
                            {
                                label: this.translocoService.translate('NotificationList'),
                                icon: 'pi pi-fw pi-bell',
                                routerLink: [`/${this.config.administrationSlug}/notifications`],
                                hasPermission: (permissionCodes: string[]): boolean => { 
                                    return (
                                        permissionCodes?.includes(BusinessPermissionCodes.ReadNotification)
                                    )
                                },
                                visible: true,
                            },
                        ]
                    },
                ]
            },
        ];
    }
}

