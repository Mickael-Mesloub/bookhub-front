import { Location } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  location: Location = inject(Location);

  label = input.required<string>();
  disabled = input<boolean>();
  clickAction = output<void>();
  goBackButton = input<boolean>(false);

  onClick(): void  {
    this.clickAction.emit();
  }

  onGoBack(): void {
    this.location.back();
  }
}
