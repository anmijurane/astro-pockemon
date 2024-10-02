import axios from "axios";
import type { PokemonApi, PokemonService, PokemonsService } from "../intefaces/service/Pokemon.type";
import type { PokemonUnique } from "../intefaces/service/PokemonUnique.type";

interface GetPokemonsParams {
  limit?: number;
}

type GetPomenoFunc = (params: GetPokemonsParams) => PokemonsService

export const getPokemons:GetPomenoFunc = async ({ limit = 50 }) => {

  const URL = {
    BASE: 'https://pokeapi.co/api/v2',
    POKEMON: '/pokemon',
    IMAGE: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'
  }

  let successfull: boolean = true;

  const pokemonData: Array<PokemonService> = [];

  try {
    const response_pokemon = await axios
      .get<PokemonApi>(`${URL.BASE}${URL.POKEMON}?limit=${limit}&offset=0`);

    if (response_pokemon.status === 200) {
      response_pokemon.data.results.forEach(pokemon => {
        const name = pokemon.name
        const id = pokemon.url.split('/')?.at(-2) || ''
        const img = `${URL.IMAGE}/${id}.png`
        pokemonData.push({ name, img, id });
      })
    }

    successfull = false;

    return { successfull, data: pokemonData }
  } catch ( error: any ) {
    return { successfull: false, data: [], error }
  }
}

