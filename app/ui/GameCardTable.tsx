'use client';

import { useEffect, useState } from 'react';
import { ClientGame, ClientCard } from '../lib/definitions';
import GameNameCard from './GameNameCard';
import GamePokemonCard from './GamePokemonCard';
import { updateCard } from '../lib/actions';
import SelectPokemonModal from './SelectPokemonModal';
import { getPokemon } from '../pokemon_data/queries';

export default function GameCardTable({ game }: { game: ClientGame }) {
  const [selectedCard, setSelectedCard] = useState<string | undefined>(undefined);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredCards, setFilteredCards] = useState<ClientCard[]>(game.cards);

  useEffect(() => {
    const newFiltered = Object.values(game.cards).filter((card) => {
      if (card.name.toLowerCase().includes(searchText)) {
        return true;
      }
      if (card.pokemon && getPokemon(card.pokemon).name.includes(searchText)) {
        return true;
      }
      return false;
    });
    setFilteredCards(newFiltered);
  }, [searchText]);

  function handleNameCardClicked(cardId: string) {
    setSelectedCard(cardId);
  }

  async function handlePokemonSelected(pokemonId: number) {
    if (selectedCard) {
      await updateCard({ id: selectedCard, pokemon: pokemonId }, game.id);
    }
  }

  return (
    <>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          onChange={(e) => setSearchText(e.target.value.toLowerCase())}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <div className="grid gap-4 grid-cols-6">
        {filteredCards.map((card) => {
          if (card.pokemon) {
            return <GamePokemonCard card={card} key={card.id} gameId={game.id} />;
          } else {
            return <GameNameCard card={card} onClick={handleNameCardClicked} key={card.id} />;
          }
        })}
        {/* {Object.values(gameState.box).map((name) => {
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
        })} */}
      </div>
      <SelectPokemonModal onSelect={handlePokemonSelected} />
    </>
  );
}
