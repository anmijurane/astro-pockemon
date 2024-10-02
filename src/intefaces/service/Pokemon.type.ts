export interface PokemonApi {
  count:    number;
  next:     string;
  previous: null;
  results:  Result[];
}

export interface Result {
  name: string;
  url:  string;
}

export interface PokemonService {
  id: string,
  name: string;
  img: string;
}

export type PokemonsService  = Promise<
  { successfull: boolean, data: Array<PokemonService>, error?: any }
>
