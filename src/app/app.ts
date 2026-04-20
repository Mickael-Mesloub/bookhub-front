import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Button } from './components/shared/button/button';
import { TextInput } from "./components/shared/inputs/text-input/text-input";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Button, TextInput],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('bookhub-front');

  clickBtn(): void {
    console.log('Button clicked!');
  }
}
