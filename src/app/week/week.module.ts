import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekComponent } from './week/week.component';
import { UserApiService } from '../services/user-api/user-api.service';
import { SidebarModule } from '../sidebar/sidebar.module';

@NgModule({
  declarations: [WeekComponent],
  imports: [CommonModule, SidebarModule],
  providers: [UserApiService],
})
export class WeekModule {}
