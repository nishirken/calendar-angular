import { Component, OnInit } from '@angular/core';
import { weekTestIds } from 'calendar-test-ids';
import { UserApiService } from '../../services/user-api/user-api.service';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.sass']
})
export class WeekComponent implements OnInit {
  constructor(private userApiService: UserApiService) { }

  testIds = weekTestIds;

  ngOnInit(): void {
    this.userApiService.getUser().subscribe(console.log);
  }
}
