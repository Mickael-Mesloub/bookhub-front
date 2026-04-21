import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Service {
  private readonly http = inject(HttpClient);

  test() {
    console.log('TEST TRIGGERED');

    return this.http.get('http://localhost:8080').subscribe();
  }
}
