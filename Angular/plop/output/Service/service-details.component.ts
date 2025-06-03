import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoService } from '@jsverse/transloco';
import { ApiService } from 'src/app/business/services/api/api.service';
import { Service } from 'src/app/business/entities/business-entities.generated';
import { BaseFormCopy, SpiderlyFormGroup, SpiderlyMessageService, BaseFormService } from 'spiderly';

@Component({
    selector: 'service-details',
    templateUrl: './service-details.component.html',
    styles: [],
})
export class ServiceDetailsComponent extends BaseFormCopy implements OnInit {
    serviceFormGroup = new SpiderlyFormGroup<Service>({});

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
}

