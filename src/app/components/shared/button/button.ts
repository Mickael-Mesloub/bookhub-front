import { Location, NgClass } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';

type Variant = "default" | "danger" | "back";

@Component({
  selector: 'app-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  location: Location = inject(Location);

  label = input.required<string>();
  disabled = input<boolean>();
  clickAction = output<void>();
  variant = input<Variant>("default");

  onClick(): void  {
    this.clickAction.emit();
  }

  onGoBack(): void {
    this.location.back();
  }
}
