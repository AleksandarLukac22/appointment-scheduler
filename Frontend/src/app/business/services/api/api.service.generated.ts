import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiSecurityService, TableFilter, TableResponse, Namebook, Codebook, LazyLoadSelectedIdsResult, VerificationTokenRequest, AuthResult, ExternalProvider } from 'spiderly';
import { ConfigService } from '../config.service';
import { Notification } from '../../entities/business-entities.generated';
import { NotificationSaveBody } from '../../entities/business-entities.generated';
import { Appointment } from '../../entities/business-entities.generated';
import { AppointmentSaveBody } from '../../entities/business-entities.generated';
import { AppointmentMainUIForm } from '../../entities/business-entities.generated';
import { Gender } from '../../entities/business-entities.generated';
import { GenderSaveBody } from '../../entities/business-entities.generated';
import { GenderMainUIForm } from '../../entities/business-entities.generated';
import { NotificationMainUIForm } from '../../entities/business-entities.generated';
import { Service } from '../../entities/business-entities.generated';
import { ServiceSaveBody } from '../../entities/business-entities.generated';
import { ServiceMainUIForm } from '../../entities/business-entities.generated';
import { UserExtended } from '../../entities/business-entities.generated';
import { UserExtendedSaveBody } from '../../entities/business-entities.generated';
import { UserExtendedMainUIForm } from '../../entities/business-entities.generated';
import { UserNotification } from '../../entities/business-entities.generated';
import { UserNotificationSaveBody } from '../../entities/business-entities.generated';
import { UserNotificationMainUIForm } from '../../entities/business-entities.generated';

@Injectable({
    providedIn: 'root'
})
export class ApiGeneratedService extends ApiSecurityService {

    constructor(
        protected override http: HttpClient,
        protected override config: ConfigService
    ) {
        super(http, config);
    }

    getAppointmentTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Appointment>> => { 
        return this.http.post<TableResponse<Appointment>>(`${this.config.apiUrl}/Appointment/GetAppointmentTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    sendNotificationEmail = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/Notification/SendNotificationEmail?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, this.config.httpOptions);
    }

    deleteNotificationForCurrentUser = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/Notification/DeleteNotificationForCurrentUser?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, this.config.httpOptions);
    }

    markNotificationAsReadForCurrentUser = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/Notification/MarkNotificationAsReadForCurrentUser?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, this.config.httpOptions);
    }

    markNotificationAsUnreadForCurrentUser = (notificationId: number, notificationVersion: number): Observable<any> => { 
        return this.http.get(`${this.config.apiUrl}/Notification/MarkNotificationAsUnreadForCurrentUser?notificationId=${notificationId}&notificationVersion=${notificationVersion}`, this.config.httpOptions);
    }

    getNotificationsForCurrentUser = (tableFilterDTO: TableFilter): Observable<TableResponse<Notification>> => { 
        return this.http.post<TableResponse<Notification>>(`${this.config.apiUrl}/Notification/GetNotificationsForCurrentUser`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    getCurrentUserExtended = (): Observable<UserExtended> => { 
        return this.http.get<UserExtended>(`${this.config.apiUrl}/UserExtended/GetCurrentUserExtended`, this.config.httpSkipSpinnerOptions);
    }



    exportAppointmentTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Appointment/ExportAppointmentTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getAppointmentList = (): Observable<Appointment[]> => { 
        return this.http.get<Appointment[]>(`${this.config.apiUrl}/Appointment/GetAppointmentList`, this.config.httpOptions);
    }

    getAppointmentMainUIFormDTO = (id: number): Observable<AppointmentMainUIForm> => { 
        return this.http.get<AppointmentMainUIForm>(`${this.config.apiUrl}/Appointment/GetAppointmentMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getAppointment = (id: number): Observable<Appointment> => { 
        return this.http.get<Appointment>(`${this.config.apiUrl}/Appointment/GetAppointment?id=${id}`, this.config.httpOptions);
    }

    getPatientAutocompleteListForAppointment = (limit: number, filter: string, appointmentId?: number): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/Appointment/GetPatientAutocompleteListForAppointment?limit=${limit}&filter=${filter}&appointmentId=${appointmentId}`, this.config.httpSkipSpinnerOptions);
    }


    getServiceDropdownListForAppointment = (appointmentId?: number): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/Appointment/GetServiceDropdownListForAppointment?appointmentId=${appointmentId}`, this.config.httpSkipSpinnerOptions);
    }
    getDoctorDropdownListForAppointment = (appointmentId?: number): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/Appointment/GetDoctorDropdownListForAppointment?appointmentId=${appointmentId}`, this.config.httpSkipSpinnerOptions);
    }






    saveAppointment = (saveBodyDTO: AppointmentSaveBody): Observable<AppointmentSaveBody> => { 
        return this.http.put<AppointmentSaveBody>(`${this.config.apiUrl}/Appointment/SaveAppointment`, saveBodyDTO, this.config.httpOptions);
    }



    deleteAppointment = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/Appointment/DeleteAppointment?id=${id}`, this.config.httpOptions);
    }


    getNotificationTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Notification>> => { 
        return this.http.post<TableResponse<Notification>>(`${this.config.apiUrl}/Notification/GetNotificationTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportNotificationTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Notification/ExportNotificationTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getNotificationList = (): Observable<Notification[]> => { 
        return this.http.get<Notification[]>(`${this.config.apiUrl}/Notification/GetNotificationList`, this.config.httpOptions);
    }

    getNotificationMainUIFormDTO = (id: number): Observable<NotificationMainUIForm> => { 
        return this.http.get<NotificationMainUIForm>(`${this.config.apiUrl}/Notification/GetNotificationMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getNotification = (id: number): Observable<Notification> => { 
        return this.http.get<Notification>(`${this.config.apiUrl}/Notification/GetNotification?id=${id}`, this.config.httpOptions);
    }







    getRecipientsTableDataForNotification = (tableFilterDTO: TableFilter): Observable<TableResponse<UserExtended>> => { 
        return this.http.post<TableResponse<UserExtended>>(`${this.config.apiUrl}/Notification/GetRecipientsTableDataForNotification`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportRecipientsTableDataToExcelForNotification = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Notification/ExportRecipientsTableDataToExcelForNotification`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    lazyLoadSelectedRecipientsIdsForNotification = (tableFilterDTO: TableFilter): Observable<LazyLoadSelectedIdsResult> => { 
        return this.http.post<LazyLoadSelectedIdsResult>(`${this.config.apiUrl}/Notification/LazyLoadSelectedRecipientsIdsForNotification`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    saveNotification = (saveBodyDTO: NotificationSaveBody): Observable<NotificationSaveBody> => { 
        return this.http.put<NotificationSaveBody>(`${this.config.apiUrl}/Notification/SaveNotification`, saveBodyDTO, this.config.httpOptions);
    }



    deleteNotification = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/Notification/DeleteNotification?id=${id}`, this.config.httpOptions);
    }


    getServiceTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<Service>> => { 
        return this.http.post<TableResponse<Service>>(`${this.config.apiUrl}/Service/GetServiceTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportServiceTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/Service/ExportServiceTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getServiceList = (): Observable<Service[]> => { 
        return this.http.get<Service[]>(`${this.config.apiUrl}/Service/GetServiceList`, this.config.httpOptions);
    }

    getServiceMainUIFormDTO = (id: number): Observable<ServiceMainUIForm> => { 
        return this.http.get<ServiceMainUIForm>(`${this.config.apiUrl}/Service/GetServiceMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getService = (id: number): Observable<Service> => { 
        return this.http.get<Service>(`${this.config.apiUrl}/Service/GetService?id=${id}`, this.config.httpOptions);
    }









    saveService = (saveBodyDTO: ServiceSaveBody): Observable<ServiceSaveBody> => { 
        return this.http.put<ServiceSaveBody>(`${this.config.apiUrl}/Service/SaveService`, saveBodyDTO, this.config.httpOptions);
    }



    deleteService = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/Service/DeleteService?id=${id}`, this.config.httpOptions);
    }


    getUserExtendedTableData = (tableFilterDTO: TableFilter): Observable<TableResponse<UserExtended>> => { 
        return this.http.post<TableResponse<UserExtended>>(`${this.config.apiUrl}/UserExtended/GetUserExtendedTableData`, tableFilterDTO, this.config.httpSkipSpinnerOptions);
    }

    exportUserExtendedTableDataToExcel = (tableFilterDTO: TableFilter): Observable<any> => { 
        return this.http.post(`${this.config.apiUrl}/UserExtended/ExportUserExtendedTableDataToExcel`, tableFilterDTO, { observe: 'response', responseType: 'blob' });
    }

    getUserExtendedList = (): Observable<UserExtended[]> => { 
        return this.http.get<UserExtended[]>(`${this.config.apiUrl}/UserExtended/GetUserExtendedList`, this.config.httpOptions);
    }

    getUserExtendedMainUIFormDTO = (id: number): Observable<UserExtendedMainUIForm> => { 
        return this.http.get<UserExtendedMainUIForm>(`${this.config.apiUrl}/UserExtended/GetUserExtendedMainUIFormDTO?id=${id}`, this.config.httpOptions);
    }

    getUserExtended = (id: number): Observable<UserExtended> => { 
        return this.http.get<UserExtended>(`${this.config.apiUrl}/UserExtended/GetUserExtended?id=${id}`, this.config.httpOptions);
    }



    getGenderDropdownListForUserExtended = (userExtendedId?: number): Observable<Namebook[]> => { 
        return this.http.get<Namebook[]>(`${this.config.apiUrl}/UserExtended/GetGenderDropdownListForUserExtended?userExtendedId=${userExtendedId}`, this.config.httpSkipSpinnerOptions);
    }






    saveUserExtended = (saveBodyDTO: UserExtendedSaveBody): Observable<UserExtendedSaveBody> => { 
        return this.http.put<UserExtendedSaveBody>(`${this.config.apiUrl}/UserExtended/SaveUserExtended`, saveBodyDTO, this.config.httpOptions);
    }

    uploadProfilePictureBlobNameForUserExtended = (file: any): Observable<string> => { 
        return this.http.post(`${this.config.apiUrl}/UserExtended/UploadProfilePictureBlobNameForUserExtended`, file, { ...this.config.httpOptions, responseType: 'text' });
    }

    deleteUserExtended = (id: number): Observable<any> => { 
        return this.http.delete(`${this.config.apiUrl}/UserExtended/DeleteUserExtended?id=${id}`, this.config.httpOptions);
    }


}
