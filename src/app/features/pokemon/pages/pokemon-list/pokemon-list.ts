import { Component, inject, OnInit } from '@angular/core';
import { PokemonStore } from '../../../../core/store/pokemon.store';
import { PokemonCard } from '../../components/pokemon-card/pokemon-card';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonCard],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
})
export class PokemonList implements OnInit {
  store = inject(PokemonStore);

  ngOnInit() {
    this.store.loadPokemon();
  }
}
