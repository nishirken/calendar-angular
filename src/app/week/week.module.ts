import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekComponent } from './week/week.component';
import { UserApiService } from '../services/user-api/user-api.service';

@NgModule({
  declarations: [WeekComponent],
  imports: [CommonModule],
  providers: [UserApiService],
})
export class WeekModule {}
