import { Component, EventEmitter, inject, Output, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { TypeCreatedFromEnumWithALL } from '../../models/book-models';
import { SearchBookService } from '../../services/search-book-service';

@Component({
  selector: 'app-book-search',
  imports: [],
  templateUrl: './book-search.html',
  styleUrl: './book-search.scss',
})
export class BookSearch {

  protected readonly searchBookService = inject(SearchBookService); // 'protected' : accessible depuis le HTML du composant, mais pas depuis l'extérieur
  readonly search: WritableSignal<string> = signal(''); // → doit être un WritableSignal car l'utilisateur la modifie directement

  // ---------------------------------------- PORTE DE SORTIE DU COMPOSANT ENFANT --------------------------------------

  // on déclare l'évènement sortant (@Output) qui contient ces données
  @Output() searchTriggered = new EventEmitter<{
    search: string;
    categories: string[];
    availability: string;
    sort: string;
  }>();

  // ---------------------------------------- PARTIE POUR LA BARRE DE RECHERCHE TEXTUELLE --------------------------------------

  // va permettre d'écouter les modifs dans la barre de recherche
  // déclanche onSearch() une fois la pause de 300ms détectée
  constructor() {
    toObservable(this.search)
      .pipe(
        debounceTime(300),
        takeUntilDestroyed(), // gère la désinscription automatiquement au moment de la destruction du composant
      )
      .subscribe(() => this.onSearch()); // ← 1ERE EMISSION : émet searchTriggered
  }

  // gestion du reset du champ de recherche textuel -> clic sur la X
  clearSearch(searchField: HTMLInputElement) {
    this.search.set(''); // vide le signal
    searchField.value = ''; // vide l'affichage du champ
    searchField.focus(); // remet le focus sur le champ
  }

  // ---------------------------------------- PARTIE POUR LES FILTRES DE RECHERCHE --------------------------------------


  // --------------------- ETAPE 1 : Méthode qui met à jour le signal contenant l'état des filtres
  // Toggle : le service gère l'état, le composant gère le flux

  toggleFiltersAndSorts<E extends Record<string, any>>(
    filtersSignal: WritableSignal<TypeCreatedFromEnumWithALL<E>>,
    targetKey: string,
    exclusive: boolean = false,
  ): void {
    // maj le signal contenant l'état des filtres : { ALL: false, ACTION: true, COMEDY: true, CRIME: false... }
    this.searchBookService.toggleFiltersAndSorts(filtersSignal, targetKey, exclusive);
    this.onSearch(); // ← 2EME EMISSION : émet searchTriggered : on lance une requête Http à chaque clic sur un filtre
  }

  // ---------- ETAPE 2 : emit : on prévient le parent de l'émission de l'evt dans l'enfant --------
  // C'est la porte de sortie du composant — collecte l'état courant de tous les signals et l'envoie au composant parent catalog via l'@Output.
  // émission de l'évènement searchTriggered qui est capté par le parent
  // Format de l'event envoyé : ex. pour la propriété categories = ['ACTION', 'COMEDY']

  onSearch() { // --> c'est l'appel à la méthode onSearch qui génère l'émission
    this.searchTriggered.emit({
      search: this.search() ?? '',
      categories: this.searchBookService.categories() ?? ['ALL'],
      availability: this.searchBookService.availability()[0] ?? 'ALL', // undefined devient 'ALL'
      sort: this.searchBookService.sort()[0] ?? 'TITLE_ATOZ', // le computed retourne un string[] même s'il n'y a qu'une valeur sélectionnée -> récupérer le 1er elt [0] = string
    });
  }


}
