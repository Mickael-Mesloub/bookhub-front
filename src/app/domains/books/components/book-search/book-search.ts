import {
  Component,
  computed,
  EventEmitter,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  TypeCreatedFromEnumWithALL,
  BookCategory,
  AvailabilityCategory,
  SortCategory,
  TypeCreatedFromEnum,
} from '../../models/book-models';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-book-search',
  imports: [],
  templateUrl: './book-search.html',
  styleUrl: './book-search.scss',
})
export class BookSearch{

  // pas besoin d'injecter de service car on remonte toutes les infos au parent via un event emitter

  // va permettre d'écouter les modifs dans la barre de recherche
  // déclanche onSearch() une fois la pause de 300ms détectée
  constructor() {
    toObservable(this.search)
      .pipe(
        debounceTime(300),
        takeUntilDestroyed() // gère la désinscription automatiquement au moment de la destruction du composant
      )
      .subscribe(() => this.onSearch());
  }

  // ----------------------------------------------------------------------------------------------------------------
  // Record<K, V> = type utilitaire TS : signigie un objet dont les clés sont de type K et les valeurs de type V.
  //              = équivaut à { [key: string]: any }
  // E extends Record<string, any> : E peut être n'importe quel type, à condition que ce soit un objet avec des clés en string.
  // En entrée : on a l'objet source de type E
  // En sortie: le même objet mais toutes les valeurs en boolean (EnumState<E>)
  // <type de E en entrée>(objet en entrée): type de
  // ----------------------------------------------------------------------------------------------------------------
  // Object.keys(source) => retourne toutes les clés d'un objet sous forme d'un tableau de string
  // ----------------------------------------------------------------------------------------------------------------
  // REDUCE = Parcourir un tableau et aggréger tous les éléments en une seule valeur."
  // Structure de reduce : tableau.reduce(callback, valeurInitiale)
  //     - callback = La fonction appelée à chaque étape
  //     - valeurInitiale = Le point de départ
  // ----------------------------------------------------------------------------------------------------------------

  // --------------- Méthode de création de l'objet contenant tous les filtres -------------
  private buildInitialFiltersAndSorts<E extends Record<string, any>, S extends string>(
    source: E,
    defaultValue: S = 'ALL' as S
  ): TypeCreatedFromEnumWithALL<E> {
    return {
      ALL: (defaultValue === 'ALL'), // on met ALL à true si c'est bien la default value
      ...Object.keys(source).reduce(
        (result: TypeCreatedFromEnum<E>, key: string): TypeCreatedFromEnum<E> => {
          result[key as keyof E] = (key === defaultValue) as TypeCreatedFromEnum<E>[keyof E]; // on met la clé à true si c'est la default value
          return result;
        },
        {} as TypeCreatedFromEnumWithALL<E>
      )
    } as TypeCreatedFromEnumWithALL<E>;
  }

  // -------------------------------- Signals d'origine ------------------------------------
  //---> initialisation des signals de filtres
  // typeof = capture la forme de l'objet pour l'utiliser comme type
  protected categoryFilters: WritableSignal<TypeCreatedFromEnumWithALL<typeof BookCategory>> =
    signal(this.buildInitialFiltersAndSorts(BookCategory, 'ALL'));

  protected availabilityFilters: WritableSignal<TypeCreatedFromEnumWithALL<typeof AvailabilityCategory>> =
    signal(this.buildInitialFiltersAndSorts(AvailabilityCategory, 'ALL'));

  protected sorts: WritableSignal<TypeCreatedFromEnumWithALL<typeof SortCategory>> =
    signal(this.buildInitialFiltersAndSorts(SortCategory, 'TITLE_ATOZ'));

  // ---------------------------- Pour utilisation dans le HTML ----------------------------
  // Signal computed — on récupère un tableau pour pouvoir itérer dessus avec @for
  readonly categoryFiltersList = computed(() =>
    Object.entries(this.categoryFilters())
      .map(([key, value]) => ({
        key: key as keyof TypeCreatedFromEnumWithALL<typeof BookCategory>, // on cast ici, le template n'a plus besoin de s'en occuper !
        value,
        label: BookCategory[key as keyof typeof BookCategory] ?? "Toutes les catégories" // pour pouvoir afficher le libellé
      }))
  );
  readonly availabilityFiltersList = computed(() =>
    Object.entries(this.availabilityFilters())
      .map(([key, value]) => ({
        key: key as keyof TypeCreatedFromEnumWithALL<typeof AvailabilityCategory>,
        value,
        label: AvailabilityCategory[key as keyof typeof AvailabilityCategory] ?? "Toutes les disponibilités"  // pour pouvoir afficher le libellé
      }))
  );
  readonly sortList = computed(() =>
    Object.entries(this.sorts())
      .map(([key, value]) => ({
        key: key as keyof TypeCreatedFromEnumWithALL<typeof SortCategory>,
        value,
        label: SortCategory[key as keyof typeof SortCategory] ?? "Dummy" // on fait un faux ALL pour être garder un méthode générique + simple
      }))                                                                // on n'affichera pas le ALL du sort dans le html
  );

  // --------------------------- Mise à jour des Signals d'origine -------------------------
  // toggleFilters met juste à jour le signal
  toggleFiltersAndSorts<E extends Record<string, any>>(
    filtersSignal: WritableSignal<TypeCreatedFromEnumWithALL<E>>,
    targetKey: keyof TypeCreatedFromEnumWithALL<E>,
    exclusive: boolean = false) // les filtres seront inclusifs par défaut
  {
    filtersSignal.update(filters => {

      const hasAll = 'ALL' in filters; // ← on détecte dynamiquement si ALL existe

      if(hasAll && targetKey === "ALL"){
        // CAS 1 : on met à false toutes les autres clés dès lors qu'on a coché ALL
        const resetFilters = Object.keys(filters).reduce((result, key) => {
          result[key as keyof typeof filters] = false as typeof filters[keyof E]; // tous mis à false
          return result;
        }, {} as typeof filters);
        return {
          ...resetFilters,
          ALL: true  // ALL seul à true
        } as typeof filters;
      }
      // CAS 2 : filtres exclusifs (availabilityFilters, sort)
      if (exclusive) {
        const resetFilters = Object.keys(filters).reduce((result, key) => {
          result[key as keyof typeof filters] = false as typeof filters[keyof E];
          return result;
        }, {} as typeof filters);
        return {
          ...resetFilters,
          [targetKey]: true,  // uniquement la clé cliquée à true
          ALL: false
        } as typeof filters;
      }
      // CAS 3 : filtres inclusifs (categoryFilters)
      return {
        ...filters,
        [targetKey]: !filters[targetKey], // on prend l'inverse
        ALL: false // ALL à false
      } as typeof filters;
    });
    this.onSearch(); // on lance une requête Http à chaque clic sur un filtre
  }

  // -------------------------- Ce qu'on va envoyer à la requête  -----------------------------
  readonly categories = computed(() =>
    Object.entries(this.categoryFilters())
      .filter(([, value]) => value === true)  // on garde uniquement les true
      .map(([key]) => key)                    // on ne garde que les clés
  );

  readonly availability = computed(() =>
    Object.entries(this.availabilityFilters())
      .filter(([, value]) => value === true)  // on garde uniquement les true
      .map(([key]) => key)                    // on ne garde que les clés
  );

  readonly sort = computed(() =>
    Object.entries(this.sorts())
      .filter(([, value]) => value === true)  // on garde uniquement les true
      .map(([key]) => key)                    // on ne garde que les clés
  )

  readonly search: WritableSignal<string> = signal('');
  // → doit être un WritableSignal car l'utilisateur la modifie directement

  // ------------------------ porte de sortie du composant enfant  -----------------------
  // on déclare l'évènement sortant (@Output) qui contient ces données
  @Output() searchTriggered = new EventEmitter<{
    search: string,
    categories: string[],
    availability: string,
    sort: string,
  }>();

  // ---------- emit : on prévient le parent de l'émission de l'evt dans l'enfant --------
  // l'utilisateur clique sur Rechercher
  // Rôle : collecter les données des filtres et prévenir le parent
  // émission de l'évènement searchTriggered qui est capté par le parent dans catalog.html (sur son composant enfant)
  onSearch() {
    this.searchTriggered.emit({
      search: this.search() ?? '',
      categories: this.categories() ?? ['ALL'],
      availability: this.availability()[0] ?? 'ALL',  // undefined devient 'ALL'
      sort: this.sort()[0]  ?? 'TITLE_ATOZ' // le computed retourne un string[] même s'il n'y a qu'une valeur sélectionnée -> récupérer le 1er elt [0] = string
    });
  }

  // gestion du reset du champs de recherche textuel
  clearSearch(searchField: HTMLInputElement) {
    this.search.set('');    // vide le signal
    searchField.value = ''; // vide l'affichage du champ
    searchField.focus();    // remet le focus sur le champ
  }


}
