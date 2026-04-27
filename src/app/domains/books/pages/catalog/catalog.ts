import { BookService } from '../../services/book-service';
import { Component, computed, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { BookCard } from '../../components/book-card/book-card';
import { BookSearch } from '../../components/book-search/book-search';
import { NotificationService } from '../../../../components/shared/notification/service/notification-service';
import { PageOfBooks } from '../../models/book-models';
import { delay } from 'rxjs';
import { ApiResponse } from '../../../../config/api/api';

@Component({
  selector: 'app-catalog',
  imports: [BookCard, BookSearch],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog implements OnInit {
  bookService: BookService = inject(BookService);
  notificationService: NotificationService = inject(NotificationService);

  // déclaration des signaux
  protected bookPage: WritableSignal<PageOfBooks | null> = signal(null);
  readonly books = computed(() => this.bookPage()?.content ?? []);
  readonly currentPage = computed(() => this.bookPage()?.number ?? 0);

  // récupération des filtres en cours via un signal
  private currentFiltersAndSorts = signal<{
    search?: string;
    categories?: string[];
    availability?: string;
    sort?: string;
  }>({});

  ngOnInit() {
    // this.fetchAllBooks(); -- à voir si on peut le suppr ? sinon plusieurs requêtes simultanées
  }

  // Rôle : appeler le service et stocker les résultats
  fetchAllBooks(page: number = 0, size: number = 20): void {
    // avant un async: écran de chargement...
    this.notificationService.openNotification({
      type: 'loading',
      message: 'Nous recherchons les livres en rayons...',
    });
    // async
    this.bookService
      .getAllBooks(
        page,
        size,
        this.currentFiltersAndSorts().sort,
        this.currentFiltersAndSorts().search,
        this.currentFiltersAndSorts().categories,
        this.currentFiltersAndSorts().availability,
      )
      .pipe
      // delay(900) // ← attend au minimum 500ms avant de traiter la réponse (réponse trop rapide en local, pas le temps de voir la modale)
      ()
      .subscribe({
        next: (response: ApiResponse<PageOfBooks>) => {
          this.bookPage.set(response.data);
          // à la fin de l'appel API (success ou error) : fermer écran de chargement
          this.notificationService.closeNotification();
        },
        error: (err) => {
          console.error('Failed to fetch books: ', err);
          // à la fin de l'appel API (success ou error) : fermer écran de chargement
          this.notificationService.closeNotification();
        },
      });
  }

  // il faut que le clic sur next / previous page on récupère les filtres en cours => via le signal booPage()

  nextPage(): void {
    const page = this.bookPage();
    if (!page) return;
    if (page.number < page.totalPages - 1) {
      this.fetchAllBooks(page.number + 1);
    }
  }

  previousPage(): void {
    const page = this.bookPage();
    if (!page) return;
    if (page.number > 0) {
      this.fetchAllBooks(page.number - 1);
    }
  }

  // Si undefined → le paramètre n'est pas envoyé dans l'URL → Spring applique sa defaultValue.
  // Rôle : recevoir les données et appeler fetchAllBooks
  // je garde handleSearch car sinon je dois insérer event dans fetchAllBook et il doit fonctionner sans aussi
  handleSearch(event: {
    search: string;
    categories: string[];
    availability: string;
    sort: string;
  }) {
    // on mémorise les filtres
    this.currentFiltersAndSorts.set({
      search: event.search,
      categories: event.categories,
      availability: event.availability,
      sort: event.sort,
    });
    this.fetchAllBooks(0); // on affiche la 1ère page des résultats de recherche à chaque nouvelle recherche
  }
}
