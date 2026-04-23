import { Component, input, model } from '@angular/core';
import { FormValueControl, ValidationError } from '@angular/forms/signals';

@Component({
  selector: 'app-custom-input',
  imports: [],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.scss',
})
export class CustomInput implements FormValueControl<string> {
  readonly value = model<string>('');
  readonly required = input<boolean>(true);
  readonly disabled = input<boolean>(false);
  readonly errors = input< readonly ValidationError[]>([]);
  readonly touched = input<boolean>(false);

  readonly label = input<string>();
  readonly placeholder = input<string>();
}
