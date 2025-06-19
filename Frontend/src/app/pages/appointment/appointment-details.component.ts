import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { ApiService } from 'src/app/business/services/api/api.service';
import { Appointment } from 'src/app/business/entities/business-entities.generated';
import { BaseFormCopy, SpiderlyFormGroup, SpiderlyMessageService, BaseFormService, IsAuthorizedForSaveEvent } from 'spiderly';
import { DropdownChangeEvent } from 'primeng/dropdown';

@Component({
    selector: 'appointment-details',
    templateUrl: './appointment-details.component.html',
    standalone:false,
    styles: [],
})
export class AppointmentDetailsComponent extends BaseFormCopy implements OnInit {
    appointmentFormGroup = new SpiderlyFormGroup<Appointment>({});
    
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
    
    isAuthorizedForSaveChange = (event: IsAuthorizedForSaveEvent) => {
        if(this.appointmentFormGroup.controls.serviceId.value !== 1){
            this.appointmentFormGroup.controls.expiredAt.disable();
        }
    }
    enableExpireAt($event: DropdownChangeEvent) {
        if($event.value === 1){
            this.appointmentFormGroup.controls.expiredAt.enable();
        }else{
            this.appointmentFormGroup.controls.expiredAt.disable();
        }
    }
}

