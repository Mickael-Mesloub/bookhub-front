// book-search.service.ts
import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import {
  AvailabilityCategory,
  BookCategoryOptionLabels,
  SortCategory,
  TypeCreatedFromEnumWithALL,
} from '../models/book-models';

@Injectable({ providedIn: 'root' })
export class SearchBookService {

  // ------------------ ETAPE 1 : Création du signal d'origine = objet contenant tous les filtres -----------------
  // ---> initialisation des signals de filtres
  // Ex. { ALL: true, ACTION: false, COMEDY: false, CRIME: false... }

  // 1. La méthode utilitaire

  private buildInitialFiltersAndSorts<E extends Record<string, any>, S extends string>(
    source: E,
    defaultValue: S = 'ALL' as S,
  ): TypeCreatedFromEnumWithALL<E> {
    const entries = Object.fromEntries(
      Object.keys(source).map((key) => [key, key === defaultValue]),
    );
    return { ALL: defaultValue === 'ALL', ...entries } as TypeCreatedFromEnumWithALL<E>;
  }

  // 2. On crée le signal d'origine via la méthode utilitaire

  // typeof = capture la forme de l'objet pour l'utiliser comme type
  readonly categoryFilters: WritableSignal<
    TypeCreatedFromEnumWithALL<typeof BookCategoryOptionLabels>
  > = signal(this.buildInitialFiltersAndSorts(BookCategoryOptionLabels, 'ALL'));

  readonly  availabilityFilters: WritableSignal<
    TypeCreatedFromEnumWithALL<typeof AvailabilityCategory>
  > = signal(this.buildInitialFiltersAndSorts(AvailabilityCategory, 'ALL'));

  readonly sorts: WritableSignal<TypeCreatedFromEnumWithALL<typeof SortCategory>> = signal(
    this.buildInitialFiltersAndSorts(SortCategory, 'TITLE_ATOZ'),
  );

  // ------------------- ETAPE 2 : Signals computed : Pour utilisation dans le HTML -------------------

  // Signal computed — on récupère un tableau d'objets pour pouvoir itérer dessus avec @for
  // Ex. [ { key: 'ALL'    , value: false , label: 'Toutes les catégories' },
  //       { key: 'ACTION' , value: true, label: 'Action' },
  //       { key: 'COMEDY' , value: true, label: 'Comédie' }, ... ]

  private createFilterList<E extends Record<string, string>>(
    filtersSignal: WritableSignal<TypeCreatedFromEnumWithALL<E>>,
    labelFromEnum: E,
    labelForAllCategory: string,
  ): { key: string; value: boolean; label: string }[] {
    return Object.entries(filtersSignal()).map(([key, value]) => ({
      key,
      value,
      label: labelFromEnum[key as keyof E] ?? labelForAllCategory,
    }));
  }

  readonly categoryFiltersList = computed(() =>
    this.createFilterList(this.categoryFilters, BookCategoryOptionLabels, 'Toutes les catégories')
  );

  readonly availabilityFiltersList = computed(() =>
    this.createFilterList(this.availabilityFilters, AvailabilityCategory, 'Toutes les disponibilités')
  );

  readonly sortList = computed(() =>
    this.createFilterList(this.sorts, SortCategory, 'Dummy') // Dummy = je fais un faux ALL pour être garder une méthode générique + simple
  );                                                         // on n'affichera pas le ALL du sort dans le html

  // ------------------------- ETAPE 3 : au clic de l'utilisateur -> Mise à jour du signal d'origine -------------------------
  // Ex. mise à jour du signal original (ETAPE 1) : { ALL: false, ACTION: true, COMEDY: true, CRIME: false... }

  toggleFiltersAndSorts<E extends Record<string, any>>(
    filtersSignal: WritableSignal<TypeCreatedFromEnumWithALL<E>>,
    targetKey: string,
    exclusive: boolean = false,
  ) {
    // les filtres seront inclusifs par défaut
    filtersSignal.update((filters) => {
      const hasAll = 'ALL' in filters; // ← on détecte dynamiquement si ALL existe

      // CAS 1 : on met à false toutes les autres clés dès lors qu'on a coché ALL
      if (hasAll && targetKey === 'ALL') {
        return Object.fromEntries(
          Object.keys(filters).map((key) => [key, key === 'ALL']),
        ) as typeof filters;
      }
      // CAS 2 : filtres exclusifs (availabilityFilters, sort)
      if (exclusive) {
        return {
          ...Object.fromEntries(Object.keys(filters).map((key) => [key, false])),
          [targetKey]: true,
        } as typeof filters;
      }
      // CAS 3 : filtres inclusifs (categoryFilters)
      return {
        ...filters,
        [targetKey]: !filters[targetKey], // on prend l'inverse
        ALL: false, // ALL à false
      } as typeof filters;
    });
    // this.onSearch(); je laisse faire le composant, il va gérer l'envoie de la requête
  }

  // ------------------- ETAPE 4 : Signals computed : Ce qu'on va envoyer à la requête  ---------------------
  // --> on va envoyer une liste de string dans la requête pour le back = les clés des filtres activés par l'utilisateur
  // Ex. ['ACTION', 'COMEDY']

  private getActiveKeys<E extends Record<string, any>>(filtersSignal: WritableSignal<TypeCreatedFromEnumWithALL<E>>): string[] {
    return Object.entries(filtersSignal())
      .filter(([, value]) => value === true) // on garde uniquement les true
      .map(([key]) => key) // on ne garde que les clés
  }

  readonly categories   = computed(() => this.getActiveKeys(this.categoryFilters));
  readonly availability = computed(() => this.getActiveKeys(this.availabilityFilters));
  readonly sort         = computed(() => this.getActiveKeys(this.sorts));

}
