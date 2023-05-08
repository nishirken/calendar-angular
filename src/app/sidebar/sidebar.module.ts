import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  declarations: [SidebarComponent],
  imports: [CommonModule],
  exports: [SidebarComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SidebarModule {}
