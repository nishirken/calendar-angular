import { Component, OnDestroy, OnInit } from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription, withLatestFrom } from 'rxjs';
import { render } from 'calendar-header';
import { Bridge } from 'calendar-header';
import { DateTimeService } from './services/date-time/date-time.service';
import { DateInterval } from '../types';
import { addWeeks, subWeeks } from 'date-fns';
import { routePaths } from './routing/routes-paths';

const isNavEnd = (ev: Event): ev is NavigationEnd =>
  ev instanceof NavigationEnd;

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.sass'],
})
export class AppComponent implements OnInit, OnDestroy {
  private isRendered = false;
  private headerComponent: ReturnType<typeof render> | null = null;
  private headerElement: HTMLElement | null = null;
  private routerSub: Subscription | null = null;
  private weekIntervalSub: Subscription | null = null;
  private weekInterval: DateInterval = { start: new Date(), end: new Date() };
  private bridge: Bridge = {
    onTodayClick: () => this.dateTimeService.selectedDate$.next(new Date()),
    onArrowLeftClick: () => {
      this.router.navigateByUrl(
        routePaths.week(subWeeks(this.dateTimeService.selectedDate$.value, 1))
      );
    },
    onArrowRightClick: () => {
      this.router.navigateByUrl(
        routePaths.week(addWeeks(this.dateTimeService.selectedDate$.value, 1))
      );
    },
    interval: this.weekInterval,
  };

  constructor(
    private readonly router: Router,
    private readonly dateTimeService: DateTimeService
  ) {}

  ngOnInit(): void {
    const el = document.getElementById('header');

    if (!el) {
      throw new Error("#header el hasn't been found");
    }

    this.headerElement = el;
    this.headerElement.style.display = 'none';
    this.headerComponent = render('#header', this.bridge);

    this.weekIntervalSub = this.dateTimeService.selectedWeekInterval$.subscribe(
      (interval) => {
        if (this.bridge.interval) {
          this.headerComponent?.$set({ bridge: { ...this.bridge, interval } });
        }
      }
    );

    this.routerSub = this.router.events
      .pipe(
        filter(isNavEnd),
        withLatestFrom(this.dateTimeService.selectedWeekInterval$)
      )
      .subscribe(([event, interval]) => {
        if (event.urlAfterRedirects.startsWith('/auth')) {
          this.isRendered = false;
          if (this.headerElement) {
            this.headerElement.style.display = 'none';
          }
          return;
        }

        if (this.isRendered) {
          return;
        } else if (this.bridge.interval) {
          this.isRendered = true;
          this.bridge.interval = interval;
          if (this.headerElement) {
            this.headerElement.style.display = 'initial';
          }
        }
      });
  }

  ngOnDestroy(): void {
    this.routerSub?.unsubscribe();
    this.weekIntervalSub?.unsubscribe();
  }
}
