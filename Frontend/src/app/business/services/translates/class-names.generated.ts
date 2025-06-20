import { Injectable } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class TranslateClassNamesGeneratedService {

    constructor(
        private translocoService: TranslocoService
    ) {
    }

    translate = (name: string): string => {
        switch(name) 
        {
            case 'Appointment':
                return this.translocoService.translate('Appointment');
            case 'AppointmentMainUIForm':
                return this.translocoService.translate('AppointmentMainUIForm');
            case 'AppointmentSaveBody':
                return this.translocoService.translate('AppointmentSaveBody');
            case 'AuthResult':
                return this.translocoService.translate('AuthResult');
            case 'BusinessObjectCodebook':
                return this.translocoService.translate('BusinessObjectCodebook');
            case 'BusinessObject':
                return this.translocoService.translate('BusinessObject');
            case 'BusinessObjectNamebook':
                return this.translocoService.translate('BusinessObjectNamebook');
            case 'Codebook':
                return this.translocoService.translate('Codebook');
            case 'Disease':
                return this.translocoService.translate('Disease');
            case 'DiseaseMainUIForm':
                return this.translocoService.translate('DiseaseMainUIForm');
            case 'DiseaseSaveBody':
                return this.translocoService.translate('DiseaseSaveBody');
            case 'ExcelReportOptions':
                return this.translocoService.translate('ExcelReportOptions');
            case 'ExternalProvider':
                return this.translocoService.translate('ExternalProvider');
            case 'Gender':
                return this.translocoService.translate('Gender');
            case 'GenderMainUIForm':
                return this.translocoService.translate('GenderMainUIForm');
            case 'GenderSaveBody':
                return this.translocoService.translate('GenderSaveBody');
            case 'JwtAuthResult':
                return this.translocoService.translate('JwtAuthResult');
            case 'LazyLoadSelectedIdsResult':
                return this.translocoService.translate('LazyLoadSelectedIdsResult');
            case 'Login':
                return this.translocoService.translate('Login');
            case 'LoginVerificationToken':
                return this.translocoService.translate('LoginVerificationToken');
            case 'Namebook':
                return this.translocoService.translate('Namebook');
            case 'Notification':
                return this.translocoService.translate('Notification');
            case 'NotificationMainUIForm':
                return this.translocoService.translate('NotificationMainUIForm');
            case 'NotificationSaveBody':
                return this.translocoService.translate('NotificationSaveBody');
            case 'PaginationResult':
                return this.translocoService.translate('PaginationResult');
            case 'PatientDocumentDisease':
                return this.translocoService.translate('PatientDocumentDisease');
            case 'PatientDocumentDiseaseMainUIForm':
                return this.translocoService.translate('PatientDocumentDiseaseMainUIForm');
            case 'PatientDocumentDiseaseSaveBody':
                return this.translocoService.translate('PatientDocumentDiseaseSaveBody');
            case 'PatientDocument':
                return this.translocoService.translate('PatientDocument');
            case 'PatientDocumentMainUIForm':
                return this.translocoService.translate('PatientDocumentMainUIForm');
            case 'PatientDocumentSaveBody':
                return this.translocoService.translate('PatientDocumentSaveBody');
            case 'Permission':
                return this.translocoService.translate('Permission');
            case 'PermissionMainUIForm':
                return this.translocoService.translate('PermissionMainUIForm');
            case 'PermissionSaveBody':
                return this.translocoService.translate('PermissionSaveBody');
            case 'ReadonlyObject':
                return this.translocoService.translate('ReadonlyObject');
            case 'RefreshToken':
                return this.translocoService.translate('RefreshToken');
            case 'RefreshTokenRequest':
                return this.translocoService.translate('RefreshTokenRequest');
            case 'Registration':
                return this.translocoService.translate('Registration');
            case 'RegistrationVerificationResult':
                return this.translocoService.translate('RegistrationVerificationResult');
            case 'RegistrationVerificationToken':
                return this.translocoService.translate('RegistrationVerificationToken');
            case 'Role':
                return this.translocoService.translate('Role');
            case 'RoleMainUIForm':
                return this.translocoService.translate('RoleMainUIForm');
            case 'RolePermission':
                return this.translocoService.translate('RolePermission');
            case 'RolePermissionMainUIForm':
                return this.translocoService.translate('RolePermissionMainUIForm');
            case 'RolePermissionSaveBody':
                return this.translocoService.translate('RolePermissionSaveBody');
            case 'RoleSaveBody':
                return this.translocoService.translate('RoleSaveBody');
            case 'Service':
                return this.translocoService.translate('Service');
            case 'ServiceMainUIForm':
                return this.translocoService.translate('ServiceMainUIForm');
            case 'ServiceSaveBody':
                return this.translocoService.translate('ServiceSaveBody');
            case 'SimpleSaveResult':
                return this.translocoService.translate('SimpleSaveResult');
            case 'TableFilterContext':
                return this.translocoService.translate('TableFilterContext');
            case 'TableFilter':
                return this.translocoService.translate('TableFilter');
            case 'TableFilterSortMeta':
                return this.translocoService.translate('TableFilterSortMeta');
            case 'TableResponse':
                return this.translocoService.translate('TableResponse');
            case 'User':
                return this.translocoService.translate('User');
            case 'UserExtended':
                return this.translocoService.translate('UserExtended');
            case 'UserExtendedMainUIForm':
                return this.translocoService.translate('UserExtendedMainUIForm');
            case 'UserExtendedSaveBody':
                return this.translocoService.translate('UserExtendedSaveBody');
            case 'UserNotification':
                return this.translocoService.translate('UserNotification');
            case 'UserNotificationMainUIForm':
                return this.translocoService.translate('UserNotificationMainUIForm');
            case 'UserNotificationSaveBody':
                return this.translocoService.translate('UserNotificationSaveBody');
            case 'UserRole':
                return this.translocoService.translate('UserRole');
            case 'UserRoleMainUIForm':
                return this.translocoService.translate('UserRoleMainUIForm');
            case 'UserRoleSaveBody':
                return this.translocoService.translate('UserRoleSaveBody');
            case 'VerificationTokenRequest':
                return this.translocoService.translate('VerificationTokenRequest');
            default:
                return null;
        }
    }
}

