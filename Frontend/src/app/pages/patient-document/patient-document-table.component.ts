import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Component, OnInit } from '@angular/core';
import { PatientDocument } from 'src/app/business/entities/business-entities.generated';
import { Column, SpiderlyDataTableComponent } from 'spiderly';

@Component({
    selector: 'patient-document-table',
    templateUrl: './patient-document-table.component.html',
    imports: [
        TranslocoDirective,
        SpiderlyDataTableComponent
    ]
})
export class PatientDocumentTableComponent implements OnInit {
    cols: Column<PatientDocument>[];

    getPatientDocumentTableDataObservableMethod = this.apiService.getPatientDocumentTableData;
    exportPatientDocumentTableDataToExcelObservableMethod = this.apiService.exportPatientDocumentTableDataToExcel;
    deletePatientDocumentObservableMethod = this.apiService.deletePatientDocument;

    constructor(
        private apiService: ApiService,
        private translocoService: TranslocoService,
    ) { }

    ngOnInit(){
        this.cols = [
            {name: this.translocoService.translate('Id'), filterType: 'numeric', field: 'id'},
            {actions:[
                {name: this.translocoService.translate('Details'), field: 'Details'},
                {name:  this.translocoService.translate('Delete'), field: 'Delete'},
            ]},
        ]
    }
}