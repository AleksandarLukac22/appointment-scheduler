import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, KeyValueDiffers, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { ApiService } from 'src/app/business/services/api/api.service';
import { Disease } from 'src/app/business/entities/business-entities.generated';
import { DiseaseBaseDetailsComponent } from 'src/app/business/components/base-details/business-base-details.generated';
import { BaseFormCopy, SpiderlyFormGroup, SpiderlyMessageService, BaseFormService, SpiderlyPanelsModule, SpiderlyControlsModule } from 'spiderly';

@Component({
    selector: 'disease-details',
    templateUrl: './disease-details.component.html',
    imports: [
        TranslocoDirective,
        SpiderlyPanelsModule,
        SpiderlyControlsModule,
        DiseaseBaseDetailsComponent
    ]
})
export class DiseaseDetailsComponent extends BaseFormCopy implements OnInit {
    diseaseFormGroup = new SpiderlyFormGroup<Disease>({});

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