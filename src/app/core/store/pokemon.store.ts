import { inject, Injectable, signal } from '@angular/core';
import { finalize, forkJoin, of, switchMap } from 'rxjs';
import { PokemonDetail } from '../models/pokemon.model';
import { Pokemon } from '../services/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonStore {
  private pokemonService = inject(Pokemon);

  pokemonList = signal<PokemonDetail[]>([]);
  loading = signal(false);
  error = signal('');
  selectedPokemon = signal<PokemonDetail | null>(null);
  currentPage = signal(1);
  limit = 20;

  loadPokemon() {
    const offset = (this.currentPage() - 1) * this.limit;
    this.loading.set(true);
    this.error.set('');

    this.pokemonService
      .getPokemonList(this.limit, offset)
      .pipe(
        switchMap((response) => {
          const requests = response.results.map((pokemon) =>
            this.pokemonService.getPokemonByUrl(pokemon.url),
          );

          return requests.length ? forkJoin(requests) : of([]);
        }),
        finalize(() => this.loading.set(false)),
      )
      .subscribe({
        next: (pokemon) => {
          this.pokemonList.set(pokemon);
        },
        error: () => {
          this.error.set('Server Error');
        },
      });
  }

  loadPokemonDetail(id: string) {
    this.loading.set(true);
    this.error.set('');
    this.selectedPokemon.set(null);

    this.pokemonService
      .getPokemonById(id)
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: (pokemon) => {
          this.selectedPokemon.set(pokemon);
        },
        error: () => {
          this.error.set('Server Error');
        },
      });
  }

  nextPage() {
    this.currentPage.update((page) => page + 1);
    this.loadPokemon();
  }

  previousPage() {
    if (this.currentPage() === 1) {
      return;
    }

    this.currentPage.update((page) => page - 1);
    this.loadPokemon();
  }
}
