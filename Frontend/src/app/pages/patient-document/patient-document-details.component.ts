import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { ApiService } from 'src/app/business/services/api/api.service';
import { PatientDocument } from 'src/app/business/entities/business-entities.generated';
import { PatientDocumentBaseDetailsComponent } from 'src/app/business/components/base-details/business-base-details.generated';
import { BaseFormCopy, SpiderlyFormGroup, SpiderlyMessageService, BaseFormService, SpiderlyPanelsModule, SpiderlyControlsModule, IsAuthorizedForSaveEvent } from 'spiderly';

@Component({
    selector: 'patient-document-details',
    templateUrl: './patient-document-details.component.html',
    imports: [
        TranslocoDirective,
        SpiderlyPanelsModule,
        SpiderlyControlsModule,
        PatientDocumentBaseDetailsComponent
    ]
})
export class PatientDocumentDetailsComponent extends BaseFormCopy implements OnInit {


    patientDocumentFormGroup = new SpiderlyFormGroup<PatientDocument>({});

    constructor(
        protected override differs: KeyValueDiffers,
        protected override http: HttpClient,
        protected override messageService: SpiderlyMessageService,
        protected override changeDetectorRef: ChangeDetectorRef,
        protected override router: Router,
        protected override route: ActivatedRoute,
        protected override translocoService: TranslocoService,
        protected override baseFormService: BaseFormService,
        private apiService: ApiService,
    ) {
        super(differs, http, messageService, changeDetectorRef, router, route, translocoService, baseFormService);
    }

    override ngOnInit() {

    }

    override onBeforeSave = (): void => {

    }

    fieldChecked() {
        if (this.patientDocumentFormGroup.controls.isPatientUnhealthy.value === true) {

            this.patientDocumentFormGroup.controls.patientIllness.enable();
        } 
        else 
        {
            this.patientDocumentFormGroup.controls.patientIllness.disable();
        }

        if (this.patientDocumentFormGroup.controls.isTreatedByDoctor.value === true) {

            this.patientDocumentFormGroup.controls.treatedIllness.enable();
        }
        else 
        {
            this.patientDocumentFormGroup.controls.treatedIllness.disable();
        }

        if (this.patientDocumentFormGroup.controls.hasBeenInHospital.value === true) {

            this.patientDocumentFormGroup.controls.medicationsTaking.enable();
        } 
        else 
        {
            this.patientDocumentFormGroup.controls.medicationsTaking.disable();
        }

        if (this.patientDocumentFormGroup.controls.hadBloodTransfusion.value === true) {

            this.patientDocumentFormGroup.controls.typeOfTransfusion.enable();
            this.patientDocumentFormGroup.controls.dateOfTransfusion.enable();

        } 
        else 
        {
            this.patientDocumentFormGroup.controls.typeOfTransfusion.disable();
            this.patientDocumentFormGroup.controls.dateOfTransfusion.disable();
        }

        if (this.patientDocumentFormGroup.controls.isPregnant.value === true) {

            this.patientDocumentFormGroup.controls.deliveryDate.enable();
        } 
        else 
        {
            this.patientDocumentFormGroup.controls.deliveryDate.disable();
        }


    }

}