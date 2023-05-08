import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DateTimeService } from '../../services/date-time/date-time.service';
import { UserApiService } from '../../services/user-api/user-api.service';
import { UserApiService as UserApiServiceStub } from '../../services/user-api/__mocks__/user-api.service';
import { WeekComponent } from './week.component';

describe('WeekComponent', () => {
  let fixture: ComponentFixture<WeekComponent>;
  const userApiServiceStub = new UserApiServiceStub();

  const activatedRoute = {
    paramMap: of({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeekComponent],
      providers: [
        { provide: UserApiService, useValue: userApiServiceStub },
        DateTimeService,
        { provide: ActivatedRoute, useValue: activatedRoute },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(WeekComponent);
    fixture.detectChanges();
  });

  it('Renders', () => {
    expect(fixture).toMatchSnapshot();
  });
});
