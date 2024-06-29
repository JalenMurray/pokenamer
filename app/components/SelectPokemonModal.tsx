'use client';
import { allPokemon } from '@/data';
import PokemonCard from './PokemonCard';
import { useEffect, useState } from 'react';
import { CardInfo, Game, Pokemon } from '../lib/definitions';

export default function SelectPokemonModal({
  game,
  onSelectCallback,
}: {
  game: Game;
  onSelectCallback: (pokemon: Pokemon) => void;
}) {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredPokemon, setFilteredPokemon] = useState<Array<Pokemon>>(Object.values(allPokemon));

  useEffect(() => {
    const newFiltered = Object.values(allPokemon).filter((pokemon) => {
      if (pokemon.name.includes(searchText)) {
        return true;
      }
      if (pokemon.id === parseFloat(searchText)) {
        return true;
      }
      return false;
    });
    setFilteredPokemon(newFiltered);
  }, [searchText]);

  function handleClick(cardInfo: CardInfo) {
    onSelectCallback(cardInfo.pokemon as Pokemon);
  }

  return (
    <>
      <dialog id={`select_pokemon_modal_${game.id}`} className="modal">
        <div className="modal-box min-w-[60vw]">
          <h3 className="font-bold text-lg py-8">Select a Pokemon to Name!</h3>
          <label className="input input-bordered flex items-center gap-2 mb-8">
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
          <div className="grid gap-4 grid-cols-5">
            {Object.values(filteredPokemon).map((pokemon) => {
              return (
                <PokemonCard
                  pokemon={pokemon}
                  key={pokemon.id}
                  name={undefined}
                  onClick={handleClick}
                />
              );
            })}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
