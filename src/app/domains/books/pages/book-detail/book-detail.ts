import { Component, inject } from '@angular/core';
import { BookDescription } from '../../components/book-description/book-description';
import { Book } from '../../models/book-models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  imports: [BookDescription],
  templateUrl: './book-detail.html',
  styleUrl: './book-detail.scss',
})
export class BookDetail {
  private readonly router: Router = inject(Router);
  book!: Book;

  constructor(activatedRoute: ActivatedRoute) {
    this.book = this.router.currentNavigation()?.extras.state as Book;
  }
}
