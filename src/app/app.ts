import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from './components/shared/button/button';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('bookhub-front');

  clickBtn(): void {
    console.log('Button clicked!');
  }
}
