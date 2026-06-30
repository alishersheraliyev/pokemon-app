import { Routes } from '@angular/router';
import { PokemonList } from './features/pokemon/pages/pokemon-list/pokemon-list';
import { PokemonDetail } from './features/pokemon/pages/pokemon-detail/pokemon-detail';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokemon',
    pathMatch: 'full',
  },
  {
    path: 'pokemon',
    component: PokemonList,
  },
  {
    path: 'pokemon/:id',
    component: PokemonDetail,
  },
];
