import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'
import { ApiService } from 'src/app/business/services/api/api.service';
import { TableFilter, TableFilterContext } from 'spiderly';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrl:'./dashboard.component.scss',
    standalone: false,
})
export class DashboardComponent implements OnInit {

  myUserId=1;
  rawEvents=[
    {
      id: '1',
      title: 'My Reservation',
      start: '2025-06-07T10:00:00',
      end: '2025-06-07T11:00:00',
      userId: 1,
      resourceId:'1'
    },
    {
      id: '2',
      title: 'Someone Else',
      start: '2025-06-07T10:00:00',
      end: '2025-06-07T13:00:00',
      userId: 2,
      resourceId:'2'
    },

    {
      id: '3',
      title: 'Someone Else',
      start: '2025-06-07T10:00:00',
      end: '2025-06-07T13:00:00',
      userId: 3,
      resourceId:'3'
    }
  ]

  coloredEvents = this.rawEvents.map(event => ({
  ...event,
  color: event.userId === this.myUserId ? '#28a745' : '#dc3545'  // green if it's yours, red if it's not
}));
  calendarOptions: CalendarOptions = {
    initialView: 'resourceTimeGridDay',
    slotDuration:'00:05:00',
    slotMinTime:'09:00:00',
    slotMaxTime:'17:00:00',
    allDaySlot:false,
    plugins: [dayGridPlugin,timeGridPlugin,resourceTimeGridPlugin],
    resources: [
      { id: '1', title: 'Medical' },
      { id: '2', title: 'Business' },
      { id: '3', title: 'Personal' }
    ],
    events:this.coloredEvents,
  };
  constructor(
    private apiService:ApiService
  ) {}

  ngOnInit() {
    const filters = new Map<string, TableFilterContext[]>();

    filters.set("reservedAt", [
     {  Value: "2025-06-07T09:00:00", Operator: "gt",MatchMode:null},
    {  Value: "2025-06-08T09:00:00", Operator: "lt",MatchMode:null}
    ]);
    const tableFilter:TableFilter = {
      filters:filters,
      first:0,
      rows:200

 
    }
    console.log(tableFilter)
    this.apiService.getAppointmentTableData(tableFilter).subscribe(appointments=>{
      console.log(appointments);
    })
  }

  ngOnDestroy(): void {

  }

}

