import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  label = input.required<string>();
  disabled = input<boolean>();
  clickAction = output<void>();

  onClick(): void  {
    this.clickAction.emit();
  }
}
