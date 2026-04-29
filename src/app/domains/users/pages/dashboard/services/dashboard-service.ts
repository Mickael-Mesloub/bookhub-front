import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiResponse, API_BASE_URL } from '../../../../../config/api/api';
import { Book } from '../../../../books/models/book-models';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private readonly http = inject(HttpClient);

  getAllInfo() {
    return this.http.get<ApiResponse<Book[]>>(`${API_BASE_URL}/dashboard/loadAllBiblio`);
  }
}
