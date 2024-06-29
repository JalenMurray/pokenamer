'use client';

import { useState } from 'react';
import { CardInfo, Game, Pokemon } from '../lib/definitions';
import NameCard from './NameCard';
import PokemonCard from './PokemonCard';
import SelectPokemonModal from './SelectPokemonModal';
import { getEvolvedPokemon } from '../utils/utils';

export default function CardGrid({ game }: { game: Game }) {
  const [selectedCard, setSelectedCard] = useState<CardInfo | undefined>(undefined);
  const [gameState, setGameState] = useState<Game>(game);

  function selectPokemonCallback(pokemon: Pokemon) {
    if (selectedCard && selectedCard.name) {
      setGameState({
        ...gameState,
        box: {
          ...gameState.box,
          [selectedCard.name]: { name: selectedCard.name, pokemon: pokemon },
        },
      });
      const selectPokemonModal = document.getElementById(
        `select_pokemon_modal_${game.id}`
      ) as HTMLDialogElement;
      selectPokemonModal.close();
    } else {
      console.log('Pokemon Selected', pokemon);
    }
  }

  function evolvePokemon(cardInfo: CardInfo) {
    const { name, pokemon } = cardInfo;
    if (!pokemon) {
      return;
    }
    let nextPokemon = getEvolvedPokemon(pokemon);
    setGameState({
      ...gameState,
      box: {
        ...gameState.box,
        [name as string]: { name: name as string, pokemon: nextPokemon },
      },
    });
  }

  return (
    <>
      <div className="grid gap-4 grid-cols-6">
        {Object.values(gameState.box).map((name) => {
          if (name.pokemon) {
            return (
              <PokemonCard
                pokemon={name.pokemon}
                name={name.name}
                key={name.name}
                onClick={(info) => evolvePokemon(info)}
              />
            );
          } else {
            return (
              <NameCard
                name={name.name}
                game={gameState}
                key={name.name}
                onClick={(name) => setSelectedCard({ name, pokemon: undefined })}
              />
            );
          }
        })}
      </div>
      <SelectPokemonModal game={gameState} onSelectCallback={selectPokemonCallback} />
    </>
  );
}
