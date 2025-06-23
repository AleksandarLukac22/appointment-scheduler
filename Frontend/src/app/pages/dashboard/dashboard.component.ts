import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventSourceInput } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
//import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid'

import { ApiService } from 'src/app/business/services/api/api.service';
import { MatchModeCodes, TableFilter, TableFilterContext } from 'spiderly';
import { Appointment } from 'src/app/business/entities/business-entities.generated';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrl:'./dashboard.component.scss',
    standalone: false,
})
export class DashboardComponent implements OnInit {

  currentUserId:string;
  calendarOptions:CalendarOptions  = {
    initialView: 'timeGridDay',
    slotDuration:'00:15:00',
    slotMinTime:'09:00:00',
    slotMaxTime:'17:00:00',
    allDaySlot:false,
    plugins: [dayGridPlugin,timeGridPlugin],
    events:[],
  };

  constructor(
    private apiService:ApiService
  ) {}
  
  ngOnInit() {
    
    const now = new Date();
    
    
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    
    const startOfTomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    
    let filters: {
      [K in keyof Appointment]?: { value: any; matchMode: MatchModeCodes }[];
    } = {
      reservedAt: [
        { matchMode: MatchModeCodes.GreaterThan, value: startOfToday },
        { matchMode: MatchModeCodes.LessThan, value: startOfTomorrow },
      ],
    };
    
    const tableFilter:TableFilter = {
      filters:filters,
      first:0,
      rows:200
    }
    this.apiService.getAppointmentTableData(tableFilter).subscribe((appointments)=>{
      this.calendarOptions.events=appointments.data.map((appointment)=>{
        console.log(appointment.doctorColor);
        return {
          id: appointment.id.toString(),
          title: appointment.serviceDisplayName,
          start: appointment.reservedAt,
          end: appointment.expiredAt,
          userId:appointment.doctorId.toString(),
          color:appointment.doctorColor,
        }
      });
    });
    
    
  }

  ngOnDestroy(): void {

  }

}

