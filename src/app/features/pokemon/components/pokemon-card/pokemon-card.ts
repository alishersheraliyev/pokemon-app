import { Component, inject, input } from '@angular/core';
import { PokemonDetail } from '../../../../core/models/pokemon.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-card',
  imports: [],
  templateUrl: './pokemon-card.html',
  styleUrl: './pokemon-card.css',
})
export class PokemonCard {
  pokemon = input.required<PokemonDetail>();

  private router = inject(Router);

  imageUrl() {
    return (
      this.pokemon().sprites.other?.['official-artwork']?.front_default ??
      this.pokemon().sprites.front_default
    );
  }

  openDetail() {
    this.router.navigate(['/pokemon', this.pokemon().id]);
  }
}
