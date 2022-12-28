import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.value = 'Value';
    component.placeholder = 'Placeholder';
    component.type = 'email';
    fixture.detectChanges();
  });

  it('Renders', () => {
    expect(fixture).toMatchSnapshot();
  });

  it('Renders with an error', () => {
    component.error = 'Error';
    fixture.detectChanges();
    expect(fixture).toMatchSnapshot();
  });
});
