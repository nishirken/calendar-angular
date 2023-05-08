import { TestBed } from '@angular/core/testing';
import { ParamMap } from '@angular/router';
import { getDate, getMonth, getYear, isSameDay } from 'date-fns';
import { DateTimeService } from './date-time.service';

describe.skip('DateTimeService', () => {
  let service: DateTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DateTimeService],
    });
    service = TestBed.inject(DateTimeService);
  });

  class _ParamMap implements ParamMap {
    private _params = new Map<string, string>();

    get keys(): string[] {
      throw new Error('keys is not implemented');
    }

    set = (param: string, value: string): void => {
      this._params.set(param, value);
    };

    has = () => {
      throw new Error("has isn't implemented");
    };
    get = (param: string): string | null => {
      return this._params.get(param) ?? null;
    };
    getAll = () => {
      throw new Error("getAll isn't implemented");
    };
  }
  const paramMap = new _ParamMap();

  paramMap.set('year', '2023');
  paramMap.set('month', '3');
  paramMap.set('day', '11');

  test('Next selectedDate$ if year in paramMap has been changed', (done) => {
    service.selectedDate$.next(new Date(2022, 0, 10));
    service.selectedDate$.subscribe((date) => {
      expect(getYear(date)).toBe(2023);
      done();
    });
    service.weakParamMap$.next(paramMap);
  });

  test('Next selectedDate$ if month in route has been changed', (done) => {
    service.selectedDate$.next(new Date(2022, 0, 10));
    service.selectedDate$.subscribe((date) => {
      expect(getMonth(date)).toBe(2);
      done();
    });
    service.weakParamMap$.next(paramMap);
  });

  test('Next selectedDate$ if day in route has been changed', (done) => {
    service.selectedDate$.next(new Date(2022, 0, 10));
    service.selectedDate$.subscribe((date) => {
      expect(getDate(date)).toBe(11);
      done();
    });
    service.weakParamMap$.next(paramMap);
  });

  test("Doesn't call next if the same date", (done) => {
    service.selectedDate$.next(new Date(2022, 0, 10));
    service.selectedDate$.subscribe((date) => {
      expect(isSameDay(date, new Date(2022, 0, 10))).toBeTruthy();
      done();
    });
    paramMap.set('year', '2022');
    paramMap.set('month', '0');
    paramMap.set('day', '10');
    service.weakParamMap$.next(paramMap);
  });
});
