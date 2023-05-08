import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './routing/app-routing.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { WeekModule } from './week/week.module';

describe.skip('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        AuthModule,
        SidebarModule,
        WeekModule,
      ],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('Renders', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture).toMatchSnapshot();
  });
});
