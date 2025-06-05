import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

@Component({
    templateUrl: './dashboard.component.html',
    standalone: false,
})
export class DashboardComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    slotDuration:'00:05:00',
    slotMinTime:'09:00:00',
    slotMaxTime:'17:00:00',
    allDaySlot:false,
    plugins: [dayGridPlugin,timeGridPlugin],

  };
  constructor(

  ) {}

  ngOnInit() {

  }

  ngOnDestroy(): void {

  }

}

