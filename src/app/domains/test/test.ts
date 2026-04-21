import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Service } from './service';

@Component({
  selector: 'app-test',
  imports: [],
  templateUrl: './test.html',
  styleUrl: './test.scss',
})
export class Test {
  testService = inject(Service);

  test(): void {
    this.testService.test();
  }
}
