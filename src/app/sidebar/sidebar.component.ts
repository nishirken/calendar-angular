import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { DateTimeService } from '../services/date-time/date-time.service';
import { routePaths } from '../routing/routes-paths';
import { sidebarTestIds } from 'calendar-test-ids';

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

type CalendarDateSelectEvent = CustomEvent<{
  selected: string;
}>;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass'],
})
export class SidebarComponent implements AfterViewInit {
  @ViewChild('datepicker') datepicker: ElementRef<any> | null = null;
  testIds = sidebarTestIds;

  constructor(
    private readonly dateTimeService: DateTimeService,
    private readonly router: Router
  ) {}

  ngAfterViewInit(): void {
    if (!this.datepicker) {
      throw new Error('No datepicker has been found');
    }

    this.datepicker.nativeElement.addEventListener(
      'selected',
      this.handleDateSelect
    );

    this.dateTimeService.selectedDate$.subscribe((date) => {
      if (this.datepicker) {
        this.datepicker.nativeElement.value = {
          text: format(date, 'MMM d, yyyy'),
          date,
        };
      }
    });
  }

  handleDateSelect = (event: Event) => {
    event.preventDefault();
    const { detail } = event as CalendarDateSelectEvent;
    const [dayMonth, year] = detail.selected.split(',');
    const [monthName, day] = dayMonth.split(' ');
    this.router.navigateByUrl(
      routePaths.week(
        new Date(
          Number(year),
          months.findIndex((m) => m === monthName),
          Number(day)
        )
      )
    );
  };
}
