import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PokemonDetail, PokemonResponse } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root',
})
export class Pokemon {
  private http = inject(HttpClient);
  private readonly api = 'https://pokeapi.co/api/v2/pokemon';

  getPokemonList(limit: number, offset: number): Observable<PokemonResponse> {
    return this.http.get<PokemonResponse>(`${this.api}?limit=${limit}&offset=${offset}`);
  }

  getPokemonById(id: number | string) {
    return this.http.get<PokemonDetail>(`${this.api}/${id}`);
  }

  getPokemonByUrl(url: string) {
    return this.http.get<PokemonDetail>(url);
  }
}
