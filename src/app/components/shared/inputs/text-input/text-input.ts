import { Component, input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

type InputType = 'text' | 'password' | 'email';

@Component({
  selector: 'app-text-input',
  imports: [ReactiveFormsModule],
  templateUrl: './text-input.html',
  styleUrl: './text-input.scss',
})
export class TextInput {
  id = input<string>();
  name = input.required<string>();
  type = input<InputType>('text');
  required = input<boolean>();
  placeholder = input<string>();
  label = input.required<string>();

  // TODO: voir pour validation (form control?) + erreurs
}
