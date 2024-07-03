'use client';

import { useEffect, useState } from 'react';
import { ClientCard, ClientGame } from '../lib/definitions';
import { Pokemon } from '../pokemon_data/definitions';
import { getPokemon, getTypeGradient } from '../pokemon_data/queries';
import { getTheme } from '../template_data/queries';
import { getPreviewPokemon } from '../utils/utils';
import PokemonGif from './PokemonGif';
import { CardSkeleton } from './Skeletons';
import Link from 'next/link';

function PokemonPreview({ card }: { card: ClientCard }) {
  const pokemon = getPokemon(card.pokemon as number);
  return (
    <div
      className="card text-white cursor-pointer w-[30%]"
      style={getTypeGradient(pokemon.types, 'card')}
    >
      <div className="grid grid-cols-2">
        <div className="flex flex-col p-4">
          <h1 className="text-3xl">{card.name}</h1>
          <h1 className="text-base">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h1>
        </div>
        <div className="w-40 h-40 flex items-center justify-center">
          <PokemonGif name={pokemon.name} />
        </div>
      </div>
    </div>
  );
}

export default function GamePreview({ game }: { game: ClientGame }) {
  const [previewPokemon, setPreviewPokemon] = useState<ClientCard[]>();

  useEffect(() => {
    setPreviewPokemon(getPreviewPokemon(game.cards));
  }, [game]);

  return (
    <Link
      href={`/game/${game.id}`}
      className="card w-full h-48 bg-neutral hover:bg-base-300 text-white cursor-pointer justify-center"
    >
      <div className="p-8 flex">
        <div className="flex flex-col gap-2 w-1/3 justify-center">
          <h1 className="text-5xl">{game.name}</h1>
          <h1 className="text-2xl">{getTheme(game.themeIdentifier).name}</h1>
        </div>
        <div className="flex gap-4 w-2/3">
          {previewPokemon ? (
            previewPokemon.map((card) => <PokemonPreview card={card} key={card.id} />)
          ) : (
            <CardSkeleton />
          )}
        </div>
      </div>
    </Link>
  );
}
