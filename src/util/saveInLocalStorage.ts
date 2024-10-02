import type { PokemonService } from 'src/intefaces/service/Pokemon.type';
import { getLocalStorageWithB64, setLocalStorageWithB64 } from './cryptBase64';

type PokemonStorage = Omit<PokemonService, 'img'>;
type SetPokemonStorage = (p: PokemonStorage) => void;
type GetAllPokemonStorage = () => Array<PokemonStorage>;
type GetPokemonStorage = (id: string, search?: Array<PokemonStorage>) => PokemonStorage | undefined;
type DelPokemonStorage = (id: string) => Array<PokemonStorage>;

const keyLocalStorage = 'pokemonFavs';

export const togglePokemonFavorite:SetPokemonStorage = (pokemon) => {
  const existPokemon = getAllPokemonStorage().some(it => it.id === pokemon.id);
  console.log({pokemon, existPokemon});
  existPokemon
    ? delPokemonStorage(pokemon.id)
    : setPokemonStorage(pokemon);
}

const setPokemonStorage:SetPokemonStorage = (pokemon) => {
  const allFavorites = getAllPokemonStorage();
  if(!getPokemonStorage(pokemon.id, allFavorites)) {
    allFavorites.push(pokemon)
    setLocalStorageWithB64(keyLocalStorage, allFavorites);
  }
}

export const getAllPokemonStorage:GetAllPokemonStorage = () => {
  if (!localStorage) {
    console.error("Localstorage not exist");
    return [];
  }
  const pokemonsFavs = getLocalStorageWithB64<Array<PokemonStorage>>(keyLocalStorage)
  return pokemonsFavs;
}

export const getPokemonStorage:GetPokemonStorage = (id, search) => {
  const allPokemons = search
    ? search
    : getAllPokemonStorage();
  return allPokemons.find(it => it.id === id);
}

export const delPokemonStorage:DelPokemonStorage = (id) => {
  const allFavorites = getAllPokemonStorage();
  const filterdArray = allFavorites.filter(pokemon => pokemon.id !== id)
  if (getPokemonStorage(id, allFavorites)) {
    setLocalStorageWithB64(keyLocalStorage,filterdArray);
  }
  return filterdArray;
}