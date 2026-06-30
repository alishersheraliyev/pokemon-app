import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonResponse } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class Pokemon {
  private http = inject(HttpClient);
  private readonly api = 'https://pokeapi.co/api/v2/pokemon';

  getPokemonList(): Observable<PokemonResponse> {
    return this.http.get<PokemonResponse>(this.api);
  }
}
