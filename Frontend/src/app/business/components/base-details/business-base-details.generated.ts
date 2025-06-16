import { ValidatorService } from 'src/app/business/services/validators/validators';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { TranslateLabelsService } from '../../services/translates/merge-labels';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../../services/api/api.service';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, firstValueFrom, forkJoin, map, Observable, of, Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth/auth.service';
import { SpiderlyControlsModule, CardSkeletonComponent, IndexCardComponent, IsAuthorizedForSaveEvent, SpiderlyDataTableComponent, SpiderlyFormArray, BaseEntity, LastMenuIconIndexClicked, SpiderlyFormGroup, SpiderlyButton, nameof, BaseFormService, getControl, Column, TableFilter, LazyLoadSelectedIdsResult, AllClickEvent, SpiderlyFileSelectEvent, getPrimengDropdownNamebookOptions, PrimengOption, SpiderlyFormControl, getPrimengAutocompleteNamebookOptions } from 'spiderly';
import { Notification, NotificationSaveBody, Appointment, Disease, Gender, PatientDocument, PatientDocumentDisease, Service, UserExtended, UserNotification, AppointmentSaveBody, DiseaseSaveBody, GenderSaveBody, PatientDocumentSaveBody, PatientDocumentDiseaseSaveBody, ServiceSaveBody, UserExtendedSaveBody, UserNotificationSaveBody } from '../../entities/business-entities.generated';

@Component({
    selector: 'appointment-base-details',
    template: `
<ng-container *transloco="let t">
    <spiderly-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showIsCanceledForAppointment" class="col-12 md:col-6">
                        <spiderly-checkbox [control]="control('isCanceled', appointmentFormGroup)"></spiderly-checkbox>
                    </div>
                    <div *ngIf="showReservedAtForAppointment" class="col-12 md:col-6">
                        <spiderly-calendar [control]="control('reservedAt', appointmentFormGroup)" [showTime]="showTimeOnReservedAtForAppointment"></spiderly-calendar>
                    </div>
                    <div *ngIf="showServiceForAppointment" class="col-12 md:col-6">
                        <spiderly-dropdown [control]="control('serviceId', appointmentFormGroup)" [options]="serviceOptionsForAppointment" (onChange)="onServiceForAppointmentChange.next($event)"></spiderly-dropdown>
                    </div>
                    <div *ngIf="showExpiredAtForAppointment" class="col-12 md:col-6">
                        <spiderly-calendar [control]="control('expiredAt', appointmentFormGroup)" [showTime]="showTimeOnExpiredAtForAppointment"></spiderly-calendar>
                    </div>
                    <div *ngIf="showDoctorForAppointment" class="col-12 md:col-6">
                        <spiderly-dropdown [control]="control('doctorId', appointmentFormGroup)" [options]="doctorOptionsForAppointment" (onChange)="onDoctorForAppointmentChange.next($event)"></spiderly-dropdown>
                    </div>
                    <div *ngIf="showPatientForAppointment" class="col-12 md:col-6">
                        <spiderly-autocomplete [control]="control('patientId', appointmentFormGroup)" [options]="patientOptionsForAppointment" [displayName]="appointmentFormGroup.controls.patientDisplayName.getRawValue()" (onTextInput)="searchPatientForAppointment($event)"></spiderly-autocomplete>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spiderly-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spiderly-button>
            @for (button of additionalButtons; track button.label) {
                <spiderly-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spiderly-button>
            }
            <return-button *ngIf="showReturnButton" ></return-button>
        </panel-footer>
    </spiderly-panel>
</ng-container>
    `,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpiderlyControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderlyDataTableComponent,
    ]
})
export class AppointmentBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onAfterFormGroupInit = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderlyFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderlyFormGroup;
    @Input() appointmentFormGroup: SpiderlyFormGroup<Appointment>;
    @Input() additionalButtons: SpiderlyButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(true);
    isAuthorizedForSave: boolean = true;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    appointmentSaveBodyName: string = nameof<AppointmentSaveBody>('appointmentDTO');



    serviceOptionsForAppointment: PrimengOption[];
    doctorOptionsForAppointment: PrimengOption[];
    patientOptionsForAppointment: PrimengOption[];





    @Input() showIsCanceledForAppointment = true;
    @Input() showReservedAtForAppointment = true;
    @Input() showServiceForAppointment = true;
    @Input() showExpiredAtForAppointment = true;
    @Input() showDoctorForAppointment = true;
    @Input() showPatientForAppointment = true;


    @Input() showTimeOnReservedAtForAppointment = false;
    @Output() onServiceForAppointmentChange = new EventEmitter<DropdownChangeEvent>();
    @Input() showTimeOnExpiredAtForAppointment = false;
    @Output() onDoctorForAppointmentChange = new EventEmitter<DropdownChangeEvent>();


    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new AppointmentSaveBody();
            saveBody.appointmentDTO = this.appointmentFormGroup.getRawValue();




            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.saveAppointment;
        this.formGroup.mainDTOName = this.appointmentSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];

            getPrimengDropdownNamebookOptions(this.apiService.getServiceDropdownListForAppointment, this.modelId).subscribe(po => {
                this.serviceOptionsForAppointment = po;
            });
            getPrimengDropdownNamebookOptions(this.apiService.getDoctorDropdownListForAppointment, this.modelId).subscribe(po => {
                this.doctorOptionsForAppointment = po;
            });


            if(this.modelId > 0){
                forkJoin({
                    mainUIFormDTO: this.apiService.getAppointmentMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initAppointmentFormGroup(new Appointment(mainUIFormDTO.appointmentDTO));



                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initAppointmentFormGroup(new Appointment({id: 0}));

                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
            }
        });
    }

    initAppointmentFormGroup(appointment: Appointment) {
        this.baseFormService.addFormGroup<Appointment>(
            this.appointmentFormGroup, 
            this.formGroup, 
            appointment, 
            this.appointmentSaveBodyName,
            ['reservedAt', 'expiredAt', 'createdAt', 'modifiedAt']
        );
        this.appointmentFormGroup.mainDTOName = this.appointmentSaveBodyName;

        this.onAfterFormGroupInit.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =

                        (currentUserPermissionCodes.includes('InsertAppointment') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdateAppointment') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.appointmentFormGroup.controls.isCanceled.enable();
                        this.appointmentFormGroup.controls.reservedAt.enable();
                        this.appointmentFormGroup.controls.serviceId.enable();
                        this.appointmentFormGroup.controls.expiredAt.enable();
                        this.appointmentFormGroup.controls.doctorId.enable();
                        this.appointmentFormGroup.controls.patientId.enable();

                    }
                    else{
                        this.appointmentFormGroup.controls.isCanceled.disable();
                        this.appointmentFormGroup.controls.reservedAt.disable();
                        this.appointmentFormGroup.controls.serviceId.disable();
                        this.appointmentFormGroup.controls.expiredAt.disable();
                        this.appointmentFormGroup.controls.doctorId.disable();
                        this.appointmentFormGroup.controls.patientId.disable();

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
        );
    }







    searchPatientForAppointment(event: AutoCompleteCompleteEvent) {
        getPrimengAutocompleteNamebookOptions(this.apiService.getPatientAutocompleteListForAppointment, 50, event?.query ?? '').subscribe(po => {
            this.patientOptionsForAppointment = po;
        });
    }



    control(formControlName: string, formGroup: SpiderlyFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SpiderlyFormArray): SpiderlyFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'disease-base-details',
    template: `
<ng-container *transloco="let t">
    <spiderly-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showNameForDisease" class="col-12 md:col-6">
                        <spiderly-textbox [control]="control('name', diseaseFormGroup)"></spiderly-textbox>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spiderly-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spiderly-button>
            @for (button of additionalButtons; track button.label) {
                <spiderly-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spiderly-button>
            }
            <return-button *ngIf="showReturnButton" ></return-button>
        </panel-footer>
    </spiderly-panel>
</ng-container>
    `,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpiderlyControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderlyDataTableComponent,
    ]
})
export class DiseaseBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onAfterFormGroupInit = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderlyFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderlyFormGroup;
    @Input() diseaseFormGroup: SpiderlyFormGroup<Disease>;
    @Input() additionalButtons: SpiderlyButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(true);
    isAuthorizedForSave: boolean = true;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    diseaseSaveBodyName: string = nameof<DiseaseSaveBody>('diseaseDTO');









    @Input() showNameForDisease = true;




    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new DiseaseSaveBody();
            saveBody.diseaseDTO = this.diseaseFormGroup.getRawValue();




            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.saveDisease;
        this.formGroup.mainDTOName = this.diseaseSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];




            if(this.modelId > 0){
                forkJoin({
                    mainUIFormDTO: this.apiService.getDiseaseMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initDiseaseFormGroup(new Disease(mainUIFormDTO.diseaseDTO));



                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initDiseaseFormGroup(new Disease({id: 0}));

                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
            }
        });
    }

    initDiseaseFormGroup(disease: Disease) {
        this.baseFormService.addFormGroup<Disease>(
            this.diseaseFormGroup, 
            this.formGroup, 
            disease, 
            this.diseaseSaveBodyName,
            ['createdAt', 'modifiedAt']
        );
        this.diseaseFormGroup.mainDTOName = this.diseaseSaveBodyName;

        this.onAfterFormGroupInit.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =

                        (currentUserPermissionCodes.includes('InsertDisease') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdateDisease') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.diseaseFormGroup.controls.name.enable();

                    }
                    else{
                        this.diseaseFormGroup.controls.name.disable();

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
        );
    }











    control(formControlName: string, formGroup: SpiderlyFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SpiderlyFormArray): SpiderlyFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'notification-base-details',
    template: `
<ng-container *transloco="let t">
    <spiderly-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showTitleForNotification" class="col-12">
                        <spiderly-textbox [control]="control('title', notificationFormGroup)"></spiderly-textbox>
                    </div>
                    <div *ngIf="showDescriptionForNotification" class="col-12">
                        <spiderly-textarea [control]="control('description', notificationFormGroup)"></spiderly-textarea>
                    </div>
                    <div *ngIf="showEmailBodyForNotification" class="col-12">
                        <spiderly-editor [control]="control('emailBody', notificationFormGroup)"></spiderly-editor>
                    </div>
                    <div *ngIf="showRecipientsForNotification" class="col-12">
                        <spiderly-data-table 
                            [tableTitle]="t('Recipients')" 
                            [cols]="recipientsTableColsForNotification" 
                            [getTableDataObservableMethod]="getRecipientsTableDataObservableMethodForNotification" 
                            [exportTableDataToExcelObservableMethod]="exportRecipientsTableDataToExcelObservableMethodForNotification"
                            [showAddButton]="false" 
                            [readonly]="!isAuthorizedForSave"
                            selectionMode="multiple"
                            [newlySelectedItems]="newlySelectedRecipientsIdsForNotification" 
                            [unselectedItems]="unselectedRecipientsIdsForNotification" 
                            [rows]="5" 
                            (onLazyLoad)="onRecipientsLazyLoadForNotification($event)"
                            [selectedLazyLoadObservableMethod]="selectedRecipientsLazyLoadMethodForNotification" 
                            (onIsAllSelectedChange)="areAllRecipientsSelectedChangeForNotification($event)"></spiderly-data-table>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spiderly-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spiderly-button>
            @for (button of additionalButtons; track button.label) {
                <spiderly-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spiderly-button>
            }
            <return-button *ngIf="showReturnButton" ></return-button>
        </panel-footer>
    </spiderly-panel>
</ng-container>
    `,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpiderlyControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderlyDataTableComponent,
    ]
})
export class NotificationBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onAfterFormGroupInit = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderlyFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderlyFormGroup;
    @Input() notificationFormGroup: SpiderlyFormGroup<Notification>;
    @Input() additionalButtons: SpiderlyButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(false);
    isAuthorizedForSave: boolean = false;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    notificationSaveBodyName: string = nameof<NotificationSaveBody>('notificationDTO');







    recipientsTableColsForNotification: Column<UserExtended>[];
    getRecipientsTableDataObservableMethodForNotification = this.apiService.getRecipientsTableDataForNotification;
    exportRecipientsTableDataToExcelObservableMethodForNotification = this.apiService.exportRecipientsTableDataToExcelForNotification;
    newlySelectedRecipientsIdsForNotification: number[] = [];
    unselectedRecipientsIdsForNotification: number[] = [];
    areAllRecipientsSelectedForNotification: boolean = null;
    lastRecipientsLazyLoadTableFilterForNotification: TableFilter;

    @Input() showTitleForNotification = true;
    @Input() showDescriptionForNotification = true;
    @Input() showEmailBodyForNotification = true;
    @Input() showRecipientsForNotification = true;




    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new NotificationSaveBody();
            saveBody.notificationDTO = this.notificationFormGroup.getRawValue();



            saveBody.selectedRecipientsIds = this.newlySelectedRecipientsIdsForNotification;
            saveBody.unselectedRecipientsIds = this.unselectedRecipientsIdsForNotification;
            saveBody.areAllRecipientsSelected = this.areAllRecipientsSelectedForNotification;
            saveBody.recipientsTableFilter = this.lastRecipientsLazyLoadTableFilterForNotification;
            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.saveNotification;
        this.formGroup.mainDTOName = this.notificationSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];


            this.recipientsTableColsForNotification = [
                {name: this.translocoService.translate('Email'), filterType: 'text', field: 'email'  },
                {name: this.translocoService.translate('CreatedAt'), filterType: 'date', field: 'createdAt' , showMatchModes: true }
            ];

            if(this.modelId > 0){
                forkJoin({
                    mainUIFormDTO: this.apiService.getNotificationMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initNotificationFormGroup(new Notification(mainUIFormDTO.notificationDTO));



                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initNotificationFormGroup(new Notification({id: 0}));

                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
            }
        });
    }

    initNotificationFormGroup(notification: Notification) {
        this.baseFormService.addFormGroup<Notification>(
            this.notificationFormGroup, 
            this.formGroup, 
            notification, 
            this.notificationSaveBodyName,
            ['createdAt', 'modifiedAt']
        );
        this.notificationFormGroup.mainDTOName = this.notificationSaveBodyName;

        this.onAfterFormGroupInit.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =

                        (currentUserPermissionCodes.includes('InsertNotification') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdateNotification') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.notificationFormGroup.controls.title.enable();
                        this.notificationFormGroup.controls.description.enable();
                        this.notificationFormGroup.controls.emailBody.enable();

                    }
                    else{
                        this.notificationFormGroup.controls.title.disable();
                        this.notificationFormGroup.controls.description.disable();
                        this.notificationFormGroup.controls.emailBody.disable();

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
        );
    }





    selectedRecipientsLazyLoadMethodForNotification = (event: TableFilter): Observable<LazyLoadSelectedIdsResult> => {
        let tableFilter: TableFilter = event;
        tableFilter.additionalFilterIdLong = this.modelId;

        return this.apiService.lazyLoadSelectedRecipientsIdsForNotification(tableFilter);
    }
    areAllRecipientsSelectedChangeForNotification(event: AllClickEvent){
        this.areAllRecipientsSelectedForNotification = event.checked;
    }
    onRecipientsLazyLoadForNotification(event: TableFilter){
        this.lastRecipientsLazyLoadTableFilterForNotification = event;
    }





    control(formControlName: string, formGroup: SpiderlyFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SpiderlyFormArray): SpiderlyFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'patient-document-base-details',
    template: `
<ng-container *transloco="let t">
    <spiderly-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showIsPatientUnhealthyForPatientDocument" class="col-12 md:col-6">
                        <spiderly-checkbox [control]="control('isPatientUnhealthy', patientDocumentFormGroup)"></spiderly-checkbox>
                    </div>
                    <div *ngIf="showPatientIllnessForPatientDocument" class="col-12 md:col-6">
                        <spiderly-textbox [control]="control('patientIllness', patientDocumentFormGroup)"></spiderly-textbox>
                    </div>
                    <div *ngIf="showIsTreatedByDoctorForPatientDocument" class="col-12 md:col-6">
                        <spiderly-checkbox [control]="control('isTreatedByDoctor', patientDocumentFormGroup)"></spiderly-checkbox>
                    </div>
                    <div *ngIf="showTreatedIllnessForPatientDocument" class="col-12 md:col-6">
                        <spiderly-textbox [control]="control('treatedIllness', patientDocumentFormGroup)"></spiderly-textbox>
                    </div>
                    <div *ngIf="showHasBeenInHospitalForPatientDocument" class="col-12 md:col-6">
                        <spiderly-checkbox [control]="control('hasBeenInHospital', patientDocumentFormGroup)"></spiderly-checkbox>
                    </div>
                    <div *ngIf="showMedicationsTakingForPatientDocument" class="col-12 md:col-6">
                        <spiderly-textbox [control]="control('medicationsTaking', patientDocumentFormGroup)"></spiderly-textbox>
                    </div>
                    <div *ngIf="showAllergicToMedicationOrSomethingForPatientDocument" class="col-12 md:col-6">
                        <spiderly-checkbox [control]="control('allergicToMedicationOrSomething', patientDocumentFormGroup)"></spiderly-checkbox>
                    </div>
                    <div *ngIf="showTreatedUnderLocalAnesthesiaForPatientDocument" class="col-12 md:col-6">
                        <spiderly-checkbox [control]="control('treatedUnderLocalAnesthesia', patientDocumentFormGroup)"></spiderly-checkbox>
                    </div>
                    <div *ngIf="showHasBleedingDisorderForPatientDocument" class="col-12 md:col-6">
                        <spiderly-checkbox [control]="control('hasBleedingDisorder', patientDocumentFormGroup)"></spiderly-checkbox>
                    </div>
                    <div *ngIf="showHasRadiationTherapyForPatientDocument" class="col-12 md:col-6">
                        <spiderly-checkbox [control]="control('hasRadiationTherapy', patientDocumentFormGroup)"></spiderly-checkbox>
                    </div>
                    <div *ngIf="showHasInfectiousDiseaseForPatientDocument" class="col-12 md:col-6">
                        <spiderly-checkbox [control]="control('hasInfectiousDisease', patientDocumentFormGroup)"></spiderly-checkbox>
                    </div>
                    <div *ngIf="showHadBloodTransfusionForPatientDocument" class="col-12 md:col-6">
                        <spiderly-checkbox [control]="control('hadBloodTransfusion', patientDocumentFormGroup)"></spiderly-checkbox>
                    </div>
                    <div *ngIf="showTypeOfTransfusionForPatientDocument" class="col-12 md:col-6">
                        <spiderly-textbox [control]="control('typeOfTransfusion', patientDocumentFormGroup)"></spiderly-textbox>
                    </div>
                    <div *ngIf="showDateOfTransfusionForPatientDocument" class="col-12 md:col-6">
                        <spiderly-calendar [control]="control('dateOfTransfusion', patientDocumentFormGroup)" [showTime]="showTimeOnDateOfTransfusionForPatientDocument"></spiderly-calendar>
                    </div>
                    <div *ngIf="showHasAidsForPatientDocument" class="col-12 md:col-6">
                        <spiderly-checkbox [control]="control('hasAids', patientDocumentFormGroup)"></spiderly-checkbox>
                    </div>
                    <div *ngIf="showIsHivPositiveForPatientDocument" class="col-12 md:col-6">
                        <spiderly-checkbox [control]="control('isHivPositive', patientDocumentFormGroup)"></spiderly-checkbox>
                    </div>
                    <div *ngIf="showIsPregnantForPatientDocument" class="col-12 md:col-6">
                        <spiderly-checkbox [control]="control('isPregnant', patientDocumentFormGroup)"></spiderly-checkbox>
                    </div>
                    <div *ngIf="showDeliveryDateForPatientDocument" class="col-12 md:col-6">
                        <spiderly-calendar [control]="control('deliveryDate', patientDocumentFormGroup)" [showTime]="showTimeOnDeliveryDateForPatientDocument"></spiderly-calendar>
                    </div>
                    <div *ngIf="showWantSixMonthTherapyMessageForPatientDocument" class="col-12 md:col-6">
                        <spiderly-checkbox [control]="control('wantSixMonthTherapyMessage', patientDocumentFormGroup)"></spiderly-checkbox>
                    </div>
                    <div *ngIf="showIsAgreedToTreatmentForPatientDocument" class="col-12 md:col-6">
                        <spiderly-checkbox [control]="control('isAgreedToTreatment', patientDocumentFormGroup)"></spiderly-checkbox>
                    </div>
                    <div *ngIf="showDiseasesForPatientDocument" class="col-12">
                        <spiderly-multiselect [control]="selectedDiseasesForPatientDocument" [options]="diseasesOptionsForPatientDocument" [label]="t('Diseases')"></spiderly-multiselect>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spiderly-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spiderly-button>
            @for (button of additionalButtons; track button.label) {
                <spiderly-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spiderly-button>
            }
            <return-button *ngIf="showReturnButton" ></return-button>
        </panel-footer>
    </spiderly-panel>
</ng-container>
    `,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpiderlyControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderlyDataTableComponent,
    ]
})
export class PatientDocumentBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onAfterFormGroupInit = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderlyFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderlyFormGroup;
    @Input() patientDocumentFormGroup: SpiderlyFormGroup<PatientDocument>;
    @Input() additionalButtons: SpiderlyButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(true);
    isAuthorizedForSave: boolean = true;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    patientDocumentSaveBodyName: string = nameof<PatientDocumentSaveBody>('patientDocumentDTO');



    diseasesOptionsForPatientDocument: PrimengOption[];

    selectedDiseasesForPatientDocument = new SpiderlyFormControl<number[]>(null, {updateOn: 'change'});



    @Input() showIsPatientUnhealthyForPatientDocument = true;
    @Input() showPatientIllnessForPatientDocument = true;
    @Input() showIsTreatedByDoctorForPatientDocument = true;
    @Input() showTreatedIllnessForPatientDocument = true;
    @Input() showHasBeenInHospitalForPatientDocument = true;
    @Input() showMedicationsTakingForPatientDocument = true;
    @Input() showAllergicToMedicationOrSomethingForPatientDocument = true;
    @Input() showTreatedUnderLocalAnesthesiaForPatientDocument = true;
    @Input() showHasBleedingDisorderForPatientDocument = true;
    @Input() showHasRadiationTherapyForPatientDocument = true;
    @Input() showHasInfectiousDiseaseForPatientDocument = true;
    @Input() showHadBloodTransfusionForPatientDocument = true;
    @Input() showTypeOfTransfusionForPatientDocument = true;
    @Input() showDateOfTransfusionForPatientDocument = true;
    @Input() showHasAidsForPatientDocument = true;
    @Input() showIsHivPositiveForPatientDocument = true;
    @Input() showIsPregnantForPatientDocument = true;
    @Input() showDeliveryDateForPatientDocument = true;
    @Input() showWantSixMonthTherapyMessageForPatientDocument = true;
    @Input() showIsAgreedToTreatmentForPatientDocument = true;
    @Input() showDiseasesForPatientDocument = true;


    @Input() showTimeOnDateOfTransfusionForPatientDocument = false;
    @Input() showTimeOnDeliveryDateForPatientDocument = false;


    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new PatientDocumentSaveBody();
            saveBody.patientDocumentDTO = this.patientDocumentFormGroup.getRawValue();

            saveBody.selectedDiseasesIds = this.selectedDiseasesForPatientDocument.getRawValue();


            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.savePatientDocument;
        this.formGroup.mainDTOName = this.patientDocumentSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];

            getPrimengDropdownNamebookOptions(this.apiService.getDiseasesDropdownListForPatientDocument, this.modelId).subscribe(po => {
                this.diseasesOptionsForPatientDocument = po;
            });


            if(this.modelId > 0){
                forkJoin({
                    mainUIFormDTO: this.apiService.getPatientDocumentMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initPatientDocumentFormGroup(new PatientDocument(mainUIFormDTO.patientDocumentDTO));

                    this.selectedDiseasesForPatientDocument.setValue(
                        mainUIFormDTO.diseasesNamebookDTOList.map(n => { return n.id })
                    );

                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initPatientDocumentFormGroup(new PatientDocument({id: 0}));

                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
            }
        });
    }

    initPatientDocumentFormGroup(patientDocument: PatientDocument) {
        this.baseFormService.addFormGroup<PatientDocument>(
            this.patientDocumentFormGroup, 
            this.formGroup, 
            patientDocument, 
            this.patientDocumentSaveBodyName,
            ['expireAt', 'createdAt', 'modifiedAt']
        );
        this.patientDocumentFormGroup.mainDTOName = this.patientDocumentSaveBodyName;

        this.onAfterFormGroupInit.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =

                        (currentUserPermissionCodes.includes('InsertPatientDocument') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdatePatientDocument') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.patientDocumentFormGroup.controls.isPatientUnhealthy.enable();
                        this.patientDocumentFormGroup.controls.patientIllness.enable();
                        this.patientDocumentFormGroup.controls.isTreatedByDoctor.enable();
                        this.patientDocumentFormGroup.controls.treatedIllness.enable();
                        this.patientDocumentFormGroup.controls.hasBeenInHospital.enable();
                        this.patientDocumentFormGroup.controls.medicationsTaking.enable();
                        this.patientDocumentFormGroup.controls.allergicToMedicationOrSomething.enable();
                        this.patientDocumentFormGroup.controls.treatedUnderLocalAnesthesia.enable();
                        this.patientDocumentFormGroup.controls.hasBleedingDisorder.enable();
                        this.patientDocumentFormGroup.controls.hasRadiationTherapy.enable();
                        this.patientDocumentFormGroup.controls.hasInfectiousDisease.enable();
                        this.patientDocumentFormGroup.controls.hadBloodTransfusion.enable();
                        this.patientDocumentFormGroup.controls.typeOfTransfusion.enable();
                        this.patientDocumentFormGroup.controls.dateOfTransfusion.enable();
                        this.patientDocumentFormGroup.controls.hasAids.enable();
                        this.patientDocumentFormGroup.controls.isHivPositive.enable();
                        this.patientDocumentFormGroup.controls.isPregnant.enable();
                        this.patientDocumentFormGroup.controls.deliveryDate.enable();
                        this.patientDocumentFormGroup.controls.wantSixMonthTherapyMessage.enable();
                        this.patientDocumentFormGroup.controls.isAgreedToTreatment.enable();
                        this.selectedDiseasesForPatientDocument.enable();

                    }
                    else{
                        this.patientDocumentFormGroup.controls.isPatientUnhealthy.disable();
                        this.patientDocumentFormGroup.controls.patientIllness.disable();
                        this.patientDocumentFormGroup.controls.isTreatedByDoctor.disable();
                        this.patientDocumentFormGroup.controls.treatedIllness.disable();
                        this.patientDocumentFormGroup.controls.hasBeenInHospital.disable();
                        this.patientDocumentFormGroup.controls.medicationsTaking.disable();
                        this.patientDocumentFormGroup.controls.allergicToMedicationOrSomething.disable();
                        this.patientDocumentFormGroup.controls.treatedUnderLocalAnesthesia.disable();
                        this.patientDocumentFormGroup.controls.hasBleedingDisorder.disable();
                        this.patientDocumentFormGroup.controls.hasRadiationTherapy.disable();
                        this.patientDocumentFormGroup.controls.hasInfectiousDisease.disable();
                        this.patientDocumentFormGroup.controls.hadBloodTransfusion.disable();
                        this.patientDocumentFormGroup.controls.typeOfTransfusion.disable();
                        this.patientDocumentFormGroup.controls.dateOfTransfusion.disable();
                        this.patientDocumentFormGroup.controls.hasAids.disable();
                        this.patientDocumentFormGroup.controls.isHivPositive.disable();
                        this.patientDocumentFormGroup.controls.isPregnant.disable();
                        this.patientDocumentFormGroup.controls.deliveryDate.disable();
                        this.patientDocumentFormGroup.controls.wantSixMonthTherapyMessage.disable();
                        this.patientDocumentFormGroup.controls.isAgreedToTreatment.disable();
                        this.selectedDiseasesForPatientDocument.disable();

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
        );
    }











    control(formControlName: string, formGroup: SpiderlyFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SpiderlyFormArray): SpiderlyFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'service-base-details',
    template: `
<ng-container *transloco="let t">
    <spiderly-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showNameForService" class="col-12 md:col-6">
                        <spiderly-textbox [control]="control('name', serviceFormGroup)"></spiderly-textbox>
                    </div>
                    <div *ngIf="showDurationForService" class="col-12 md:col-6">
                        <spiderly-number [control]="control('duration', serviceFormGroup)"></spiderly-number>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spiderly-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spiderly-button>
            @for (button of additionalButtons; track button.label) {
                <spiderly-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spiderly-button>
            }
            <return-button *ngIf="showReturnButton" ></return-button>
        </panel-footer>
    </spiderly-panel>
</ng-container>
    `,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpiderlyControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderlyDataTableComponent,
    ]
})
export class ServiceBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onAfterFormGroupInit = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderlyFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderlyFormGroup;
    @Input() serviceFormGroup: SpiderlyFormGroup<Service>;
    @Input() additionalButtons: SpiderlyButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(true);
    isAuthorizedForSave: boolean = true;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    serviceSaveBodyName: string = nameof<ServiceSaveBody>('serviceDTO');









    @Input() showNameForService = true;
    @Input() showDurationForService = true;




    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new ServiceSaveBody();
            saveBody.serviceDTO = this.serviceFormGroup.getRawValue();




            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.saveService;
        this.formGroup.mainDTOName = this.serviceSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];




            if(this.modelId > 0){
                forkJoin({
                    mainUIFormDTO: this.apiService.getServiceMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initServiceFormGroup(new Service(mainUIFormDTO.serviceDTO));



                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initServiceFormGroup(new Service({id: 0}));

                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
            }
        });
    }

    initServiceFormGroup(service: Service) {
        this.baseFormService.addFormGroup<Service>(
            this.serviceFormGroup, 
            this.formGroup, 
            service, 
            this.serviceSaveBodyName,
            ['createdAt', 'modifiedAt']
        );
        this.serviceFormGroup.mainDTOName = this.serviceSaveBodyName;

        this.onAfterFormGroupInit.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =

                        (currentUserPermissionCodes.includes('InsertService') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdateService') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.serviceFormGroup.controls.name.enable();
                        this.serviceFormGroup.controls.duration.enable();

                    }
                    else{
                        this.serviceFormGroup.controls.name.disable();
                        this.serviceFormGroup.controls.duration.disable();

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
        );
    }











    control(formControlName: string, formGroup: SpiderlyFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SpiderlyFormArray): SpiderlyFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}

@Component({
    selector: 'user-extended-base-details',
    template: `
<ng-container *transloco="let t">
    <spiderly-panel [isFirstMultiplePanel]="isFirstMultiplePanel" [isMiddleMultiplePanel]="isMiddleMultiplePanel" [isLastMultiplePanel]="isLastMultiplePanel" [showPanelHeader]="showPanelHeader" >
        <panel-header [title]="panelTitle" [icon]="panelIcon"></panel-header>

        <panel-body>
            @defer (when loading === false) {
                <form class="grid">
                    <ng-content select="[BEFORE]"></ng-content>
                    <div *ngIf="showProfilePictureBlobNameForUserExtended" class="col-12">
                        <spiderly-file [control]="control('profilePictureBlobName', userExtendedFormGroup)" [fileData]="userExtendedFormGroup.controls.profilePictureBlobNameData.getRawValue()" [objectId]="userExtendedFormGroup.controls.id.getRawValue()" (onFileSelected)="uploadProfilePictureBlobNameForUserExtended($event)" [disabled]="!isAuthorizedForSave"></spiderly-file>
                    </div>
                    <div *ngIf="showBirthDateForUserExtended" class="col-12 md:col-6">
                        <spiderly-calendar [control]="control('birthDate', userExtendedFormGroup)" [showTime]="showTimeOnBirthDateForUserExtended"></spiderly-calendar>
                    </div>
                    <div *ngIf="showHasLoggedInWithExternalProviderForUserExtended" class="col-12 md:col-6">
                        <spiderly-checkbox [control]="control('hasLoggedInWithExternalProvider', userExtendedFormGroup)"></spiderly-checkbox>
                    </div>
                    <div *ngIf="showIsDisabledForUserExtended" class="col-12 md:col-6">
                        <spiderly-checkbox [control]="control('isDisabled', userExtendedFormGroup)"></spiderly-checkbox>
                    </div>
                    <div *ngIf="showGenderForUserExtended" class="col-12 md:col-6">
                        <spiderly-dropdown [control]="control('genderId', userExtendedFormGroup)" [options]="genderOptionsForUserExtended" (onChange)="onGenderForUserExtendedChange.next($event)"></spiderly-dropdown>
                    </div>
                    <ng-content select="[AFTER]"></ng-content>
                </form>
            } @placeholder {
                <card-skeleton [height]="502"></card-skeleton>
            }
        </panel-body>

        <panel-footer>
            <spiderly-button [disabled]="!isAuthorizedForSave" (onClick)="save()" [label]="t('Save')" icon="pi pi-save"></spiderly-button>
            @for (button of additionalButtons; track button.label) {
                <spiderly-button (onClick)="button.onClick()" [disabled]="button.disabled" [label]="button.label" [icon]="button.icon"></spiderly-button>
            }
            <return-button *ngIf="showReturnButton" ></return-button>
        </panel-footer>
    </spiderly-panel>
</ng-container>
    `,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        SpiderlyControlsModule,
        TranslocoDirective,
        CardSkeletonComponent,
        IndexCardComponent,
        SpiderlyDataTableComponent,
    ]
})
export class UserExtendedBaseDetailsComponent {
    @Output() onSave = new EventEmitter<void>();
    @Output() onAfterFormGroupInit = new EventEmitter<void>();
    @Input() getCrudMenuForOrderedData: (formArray: SpiderlyFormArray, modelConstructor: BaseEntity, lastMenuIconIndexClicked: LastMenuIconIndexClicked, adjustFormArrayManually: boolean) => MenuItem[];
    @Input() formGroup: SpiderlyFormGroup;
    @Input() userExtendedFormGroup: SpiderlyFormGroup<UserExtended>;
    @Input() additionalButtons: SpiderlyButton[] = [];
    @Input() isFirstMultiplePanel: boolean = false;
    @Input() isMiddleMultiplePanel: boolean = false;
    @Input() isLastMultiplePanel: boolean = false;
    @Input() showPanelHeader: boolean = true;
    @Input() panelTitle: string;
    @Input() panelIcon: string;
    @Input() showReturnButton: boolean = true;
    authorizationForSaveSubscription: Subscription;
    @Input() authorizedForSaveObservable: () => Observable<boolean> = () => of(true);
    isAuthorizedForSave: boolean = true;
    @Output() onIsAuthorizedForSaveChange = new EventEmitter<IsAuthorizedForSaveEvent>(); 

    modelId: number;
    loading: boolean = true;

    userExtendedSaveBodyName: string = nameof<UserExtendedSaveBody>('userExtendedDTO');



    genderOptionsForUserExtended: PrimengOption[];





    @Input() showProfilePictureBlobNameForUserExtended = true;
    @Input() showBirthDateForUserExtended = true;
    @Input() showHasLoggedInWithExternalProviderForUserExtended = true;
    @Input() showIsDisabledForUserExtended = true;
    @Input() showGenderForUserExtended = true;


    @Input() showTimeOnBirthDateForUserExtended = false;
    @Output() onGenderForUserExtendedChange = new EventEmitter<DropdownChangeEvent>();


    constructor(
        private apiService: ApiService,
        private route: ActivatedRoute,
        private baseFormService: BaseFormService,
        private validatorService: ValidatorService,
        private translateLabelsService: TranslateLabelsService,
        private translocoService: TranslocoService,
        private authService: AuthService,
    ) {}

    ngOnInit(){
        this.formGroup.initSaveBody = () => { 
            let saveBody = new UserExtendedSaveBody();
            saveBody.userExtendedDTO = this.userExtendedFormGroup.getRawValue();




            return saveBody;
        }

        this.formGroup.saveObservableMethod = this.apiService.saveUserExtended;
        this.formGroup.mainDTOName = this.userExtendedSaveBodyName;

        this.route.params.subscribe(async (params) => {
            this.modelId = params['id'];

            getPrimengDropdownNamebookOptions(this.apiService.getGenderDropdownListForUserExtended, this.modelId).subscribe(po => {
                this.genderOptionsForUserExtended = po;
            });


            if(this.modelId > 0){
                forkJoin({
                    mainUIFormDTO: this.apiService.getUserExtendedMainUIFormDTO(this.modelId),
                })
                .subscribe(({ mainUIFormDTO }) => {
                    this.initUserExtendedFormGroup(new UserExtended(mainUIFormDTO.userExtendedDTO));



                    this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                    this.loading = false;
                });
            }
            else{
                this.initUserExtendedFormGroup(new UserExtended({id: 0}));

                this.authorizationForSaveSubscription = this.handleAuthorizationForSave().subscribe();
                this.loading = false;
            }
        });
    }

    initUserExtendedFormGroup(userExtended: UserExtended) {
        this.baseFormService.addFormGroup<UserExtended>(
            this.userExtendedFormGroup, 
            this.formGroup, 
            userExtended, 
            this.userExtendedSaveBodyName,
            ['createdAt', 'modifiedAt']
        );
        this.userExtendedFormGroup.mainDTOName = this.userExtendedSaveBodyName;

        this.onAfterFormGroupInit.next();
    }

    handleAuthorizationForSave = () => {
        return combineLatest([this.authService.currentUserPermissionCodes$, this.authorizedForSaveObservable()]).pipe(
            map(([currentUserPermissionCodes, isAuthorizedForSave]) => {
                if (currentUserPermissionCodes != null && isAuthorizedForSave != null) {
                    this.isAuthorizedForSave =

                        (currentUserPermissionCodes.includes('InsertUserExtended') && this.modelId <= 0) || 
                        (currentUserPermissionCodes.includes('UpdateUserExtended') && this.modelId > 0) ||
                        isAuthorizedForSave;

                    if (this.isAuthorizedForSave) { 
                        this.userExtendedFormGroup.controls.profilePictureBlobName.enable();
                        this.userExtendedFormGroup.controls.birthDate.enable();
                        this.userExtendedFormGroup.controls.hasLoggedInWithExternalProvider.enable();
                        this.userExtendedFormGroup.controls.isDisabled.enable();
                        this.userExtendedFormGroup.controls.genderId.enable();

                    }
                    else{
                        this.userExtendedFormGroup.controls.profilePictureBlobName.disable();
                        this.userExtendedFormGroup.controls.birthDate.disable();
                        this.userExtendedFormGroup.controls.hasLoggedInWithExternalProvider.disable();
                        this.userExtendedFormGroup.controls.isDisabled.disable();
                        this.userExtendedFormGroup.controls.genderId.disable();

                    }

                    this.onIsAuthorizedForSaveChange.next(new IsAuthorizedForSaveEvent({
                        isAuthorizedForSave: this.isAuthorizedForSave, 
                        currentUserPermissionCodes: currentUserPermissionCodes
                    })); 
                }
            })
        );
    }









    uploadProfilePictureBlobNameForUserExtended(event: SpiderlyFileSelectEvent){
        this.apiService.uploadProfilePictureBlobNameForUserExtended(event.formData).subscribe((completeFileName: string) => {
            this.userExtendedFormGroup.controls.profilePictureBlobName.setValue(completeFileName);
        });
    }

    control(formControlName: string, formGroup: SpiderlyFormGroup){
        return getControl(formControlName, formGroup);
    }

    getFormArrayGroups<T>(formArray: SpiderlyFormArray): SpiderlyFormGroup<T>[]{
        return this.baseFormService.getFormArrayGroups<T>(formArray);
    }

    save(){
        this.onSave.next();
    }

	ngOnDestroy(){
        if (this.authorizationForSaveSubscription) {
            this.authorizationForSaveSubscription.unsubscribe();
        }
    }

}
