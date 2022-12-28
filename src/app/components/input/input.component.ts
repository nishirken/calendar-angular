import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent {
  @Input() value= "";
  @Input() placeholder = "";
  @Input() error = "";
  @Input() type = "";
  @Input() testId?: string;
  @Input() errorTestId?: string;

  @Output() onInput = new EventEmitter<Event>();
}
