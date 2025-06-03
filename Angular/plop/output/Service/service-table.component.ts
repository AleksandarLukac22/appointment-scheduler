import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslocoService } from '@jsverse/transloco';
import { Component, OnInit } from '@angular/core';
import { Column } from 'spiderly';
import { Service } from 'src/app/business/entities/business-entities.generated';

@Component({
    selector: 'service-table',
    templateUrl: './service-table.component.html',
    styles: []
})
export class ServiceTableComponent implements OnInit {
    cols: Column<Service>[];

    getServiceTableDataObservableMethod = this.apiService.getServiceTableData;
    exportServiceTableDataToExcelObservableMethod = this.apiService.exportServiceTableDataToExcel;
    deleteServiceObservableMethod = this.apiService.deleteService;

    constructor(
        private apiService: ApiService,
        private translocoService: TranslocoService,
    ) { }

    ngOnInit(){
        this.cols = [
            {name: this.translocoService.translate('Actions'), actions:[
                {name: this.translocoService.translate('Details'), field: 'Details'},
                {name:  this.translocoService.translate('Delete'), field: 'Delete'},
            ]},
            {name: this.translocoService.translate('Id'), filterType: 'numeric', field: 'id'},
        ]
    }
}
