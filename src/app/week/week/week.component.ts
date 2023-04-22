import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { weekTestIds } from 'calendar-test-ids';
import { Subscription } from 'rxjs';
import { DateTimeService } from '../../services/date-time/date-time.service';
import { UserApiService } from '../../services/user-api/user-api.service';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.sass'],
})
export class WeekComponent implements OnInit, OnDestroy {
  private routeParamMapSub: Subscription | null = null;

  constructor(
    private readonly userApiService: UserApiService,
    private readonly route: ActivatedRoute,
    private readonly dateTimeService: DateTimeService
  ) {}

  testIds = weekTestIds;

  ngOnInit(): void {
    this.routeParamMapSub = this.route.paramMap.subscribe((params) =>
      this.dateTimeService.weakParamMap$.next(params)
    );
    this.userApiService.getUser().subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.routeParamMapSub?.unsubscribe();
  }
}
