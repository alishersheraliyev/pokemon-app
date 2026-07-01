import { Component, inject, OnInit } from '@angular/core';
import { PokemonStore } from '../../../../core/store/pokemon.store';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-detail',
  imports: [RouterLink],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
})
export class PokemonDetailPage implements OnInit {
  store = inject(PokemonStore);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.store.loadPokemonDetail(id);
    }
  }

  imageUrl() {
    const pokemon = this.store.selectedPokemon();

    return (
      pokemon?.sprites.other?.['official-artwork']?.front_default ??
      pokemon?.sprites.front_default ??
      ''
    );
  }
}
