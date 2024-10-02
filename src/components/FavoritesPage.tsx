import { createSignal, For, Show } from "solid-js";
import { delPokemonStorage, getAllPokemonStorage } from "src/util/saveInLocalStorage"
import { TrashOutline } from "src/svgComponent";
import '../pages/favorites/styles.css';

export const FavoritesPage = () => {

  const [ pokemons, setPokemons ] = createSignal(getAllPokemonStorage());

  const handleRemoveFav = (id: string) => {
    const newArray = delPokemonStorage(id);
    setPokemons(newArray);
  }

  return (
    <div class="container--favorite">
      <Show when={pokemons().length <= 0}>
        <div class="no-favorites">
          <h1>No tienes favoritos</h1>
          <a href="/pokemons/1">Agrega uno aquí</a>
        </div>
      </Show>
      <For each={pokemons()}>
        {pokemon => (
          <div class="card-container-fav">
            <a href={`/pokemon/${pokemon.name}`} class="card-fav">
              <img
                style={`view-transition-name: ${pokemon.name}-image`}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                class="card__img"
                />
            </a>
            <div class="card-title_fav">
              <p>{pokemon.name.toUpperCase()}</p>
              <button onClick={() => handleRemoveFav(pokemon.id)}>
                <TrashOutline height="2.5rem" width="2.5rem" />
              </button>
            </div>
          </div>
        )}
      </For>
    </div>
  )
}


