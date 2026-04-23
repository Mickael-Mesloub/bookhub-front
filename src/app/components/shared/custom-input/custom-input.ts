import { Component, input, model, OnInit } from '@angular/core';
import { FormField, FormValueControl, ValidationError } from '@angular/forms/signals';

@Component({
  selector: 'app-custom-input',
  imports: [FormField],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.scss',
})
export class CustomInput implements FormValueControl<string>, OnInit {
  readonly value = model<string>('');
  readonly required = input<boolean>(false);
  readonly disabled = input<boolean>(false);
  readonly errors = input<readonly ValidationError[]>([]);
  readonly touched = model<boolean>(false);
  readonly pristine = input<boolean>(false);
  readonly invalid = input<boolean>(false);
  readonly dirty = input<boolean>(false);

  readonly label = input<string>();
  readonly placeholder = input<string>();

  ngOnInit(): void {
    console.log(this.value());
  }
}
