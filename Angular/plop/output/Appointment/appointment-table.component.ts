import { ApiService } from 'src/app/business/services/api/api.service';
import { TranslocoService } from '@jsverse/transloco';
import { Component, OnInit } from '@angular/core';
import { Column } from 'spiderly';
import { Appointment } from 'src/app/business/entities/business-entities.generated';

@Component({
    selector: 'appointment-table',
    templateUrl: './appointment-table.component.html',
    styles: []
})
export class AppointmentTableComponent implements OnInit {
    cols: Column<Appointment>[];

    getAppointmentTableDataObservableMethod = this.apiService.getAppointmentTableData;
    exportAppointmentTableDataToExcelObservableMethod = this.apiService.exportAppointmentTableDataToExcel;
    deleteAppointmentObservableMethod = this.apiService.deleteAppointment;

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
