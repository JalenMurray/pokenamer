import { useEffect, useState } from 'react';
import { ClientCard } from '../lib/definitions';
import { getPokemon, getSpriteURL, getTypeGradient } from '../pokemon_data/queries';
import CardModal from './CardModal';
import PokemonGif from './PokemonGif';
import { Pokemon } from '../pokemon_data/definitions';
import { useMutation } from '@tanstack/react-query';

export default function GamePokemonCard({ card, gameId }: { card: ClientCard; gameId: string }) {
  if (!card.pokemon) {
    return;
  }
  const [pokemon, setPokemon] = useState<Pokemon>(getPokemon(card.pokemon));

  useEffect(() => {
    setPokemon(getPokemon(card.pokemon as number));
  }, [card]);

  function handleClick() {
    const cardModal = document.getElementById(`card_modal_${card.id}`) as HTMLDialogElement;
    cardModal.showModal();
  }

  return (
    <>
      <div
        className="card w-128 h-40 text-white cursor-pointer"
        style={getTypeGradient(pokemon.types, 'card')}
        onClick={handleClick}
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
      <CardModal card={card} />
    </>
  );
}
