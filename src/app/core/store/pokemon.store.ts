import { inject, Injectable, signal } from '@angular/core';
import { Pokemon } from '../services/pokemon';
import { Pokemon as PokemonModel } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class PokemonStore {
  private pokemonService = inject(Pokemon);

  pokemonList = signal<PokemonModel[]>([]);

  loading = signal(false);

  error = signal('');

  loadPokemon() {
    this.loading.set(true);

    this.pokemonService.getPokemonList().subscribe({
      next: (response) => {
        this.pokemonList.set(response.results);
      },

      error: () => {
        this.error.set('Server Error');

        this.loading.set(false);
      },

      complete: () => {
        this.loading.set(false);
      },
    });
  }
}
