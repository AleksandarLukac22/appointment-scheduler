import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslocoDirective, TranslocoService } from '@jsverse/transloco';
import { Component, OnInit } from '@angular/core';
import { Disease } from 'src/app/business/entities/business-entities.generated';
import { Column, SpiderlyDataTableComponent } from 'spiderly';

@Component({
    selector: 'disease-table',
    templateUrl: './disease-table.component.html',
    imports: [
        TranslocoDirective,
        SpiderlyDataTableComponent
    ]
})
export class DiseaseTableComponent implements OnInit {
    cols: Column<Disease>[];

    getDiseaseTableDataObservableMethod = this.apiService.getDiseaseTableData;
    exportDiseaseTableDataToExcelObservableMethod = this.apiService.exportDiseaseTableDataToExcel;
    deleteDiseaseObservableMethod = this.apiService.deleteDisease;

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