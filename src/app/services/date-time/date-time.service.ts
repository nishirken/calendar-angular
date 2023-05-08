import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
import {
  endOfWeek,
  isSameDay,
  setDate,
  setMonth,
  setYear,
  startOfWeek,
} from 'date-fns';
import { BehaviorSubject, filter, map, Subject, withLatestFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DateTimeService {
  public readonly currentDate$ = new BehaviorSubject<Date>(new Date());
  public readonly selectedDate$ = new BehaviorSubject<Date>(new Date());
  public readonly selectedWeekInterval$ = this.selectedDate$.pipe(
    map((date) => ({
      start: startOfWeek(date),
      end: endOfWeek(date),
    }))
  );
  public readonly weakParamMap$ = new Subject<ParamMap>();

  constructor() {
    window.setInterval(() => {
      this.currentDate$.next(new Date());
    }, 1000);

    this.weakParamMap$
      .pipe(
        map((params) => {
          const selectedDate = this.selectedDate$.getValue();
          const year = this.getWeekParam(params, 'year');
          const month = this.getWeekParam(params, 'month');
          const day = this.getWeekParam(params, 'day');

          return setDate(setMonth(setYear(selectedDate, year), month - 1), day);
        }),
        withLatestFrom(this.selectedDate$),
        filter(([newDate, oldDate]) => !isSameDay(oldDate, newDate))
      )
      .subscribe(([newDate]) => this.selectedDate$.next(newDate));
  }

  private getWeekParam(
    params: ParamMap,
    type: 'year' | 'month' | 'day'
  ): number {
    const p = params.get(type);

    if (p === null || Number.isNaN(Number(p))) {
      throw new Error(`Url's ${type} param is not a number, but ${p}`);
    }

    return Number(p);
  }
}
