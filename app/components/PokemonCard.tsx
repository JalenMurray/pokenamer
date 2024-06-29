'use client';

import { CardInfo, Game, Pokemon } from '../lib/definitions';
import { getGradientStyles } from '../utils/utils';

export default function PokemonCard({
  pokemon,
  name,
  onClick,
}: {
  pokemon: Pokemon;
  name: string | undefined;
  onClick: (cardInfo: CardInfo) => void;
}) {
  function handleClick() {
    onClick({ pokemon, name });
  }

  return (
    <div
      className="card text-white cursor-pointer"
      style={getGradientStyles(pokemon.types)}
      onClick={handleClick}
    >
      <div className="grid grid-cols-2">
        <div className="flex flex-col p-4">
          {name && <h1 className="text-2xl">{name}</h1>}
          <h1 className="text-base">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h1>
        </div>
        <div className="w-32 h-32 flex items-center justify-center">
          <img
            src={`https://play.pokemonshowdown.com/sprites/xyani/${pokemon.name}.gif`}
            alt={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          />
        </div>
      </div>
    </div>
  );
}
