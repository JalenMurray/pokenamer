'use client';

import { Pokemon } from '../pokemon_data/definitions';
import { getSpriteURL, getTypeGradient } from '../pokemon_data/queries';
import PokemonGif from './PokemonGif';

export default function ModalPokemonCard({
  pokemon,
  modalId,
  onClick,
}: {
  pokemon: Pokemon;
  modalId: string;
  onClick: (pokemonId: number) => void;
}) {
  function handleClick() {
    onClick(pokemon.id);
    const modal = document.getElementById(modalId) as HTMLDialogElement;
    modal.close();
  }

  return (
    <div
      className="card text-white cursor-pointer"
      style={getTypeGradient(pokemon.types, 'card')}
      onClick={handleClick}
    >
      <div className="grid grid-cols-2">
        <div className="flex flex-col p-4">
          <h1 className="text-base">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h1>
        </div>
        <div className="w-32 h-32 flex items-center justify-center">
          <PokemonGif name={pokemon.name} />
        </div>
      </div>
    </div>
  );
}
