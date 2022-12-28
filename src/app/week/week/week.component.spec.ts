import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserApiService } from '../../services/user-api/user-api.service';
import { UserApiService as UserApiServiceStub } from '../../services/user-api/__mocks__/user-api.service';
import { WeekComponent } from './week.component';

describe('WeekComponent', () => {
  let component: WeekComponent;
  let fixture: ComponentFixture<WeekComponent>;
  let userApiServiceStub = new UserApiServiceStub();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeekComponent ],
      providers: [ { provide: UserApiService, useValue: userApiServiceStub, } ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Renders', () => {
    expect(fixture).toMatchSnapshot();
  });
});
