'use client';

import { useEffect, useState } from 'react';
import { ClientGame, ClientCard, Card } from '../lib/definitions';
import GameNameCard from './GameNameCard';
import GamePokemonCard from './GamePokemonCard';
import { fetchGameCards, updateCard } from '../lib/actions';
import SelectPokemonModal from './SelectPokemonModal';
import { getPokemon } from '../pokemon_data/queries';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CardTableSkeleton } from './Skeletons';

export default function GameCardTable({ game }: { game: ClientGame }) {
  const queryClient = useQueryClient();

  const { data: cards, isSuccess } = useQuery({
    queryKey: ['cards'],
    queryFn: async () => fetchGameCards(game.id),
  });

  if (!isSuccess || !cards) {
    return <CardTableSkeleton />;
  }

  const [selectedCard, setSelectedCard] = useState<string | undefined>(undefined);
  const [searchText, setSearchText] = useState<string>('');
  const [filteredCards, setFilteredCards] = useState<ClientCard[]>(cards);

  function filterNames(card: ClientCard) {
    if (card.name.toLowerCase().includes(searchText)) {
      return true;
    }
    if (card.pokemon && getPokemon(card.pokemon).name.includes(searchText)) {
      return true;
    }
    return false;
  }

  function filterAssigned(card: ClientCard) {
    return card.pokemon !== undefined;
  }

  function getFilteredCards(searchText: string, allCards: ClientCard[]) {
    const newFiltered = Object.values(allCards).filter((card) => {
      switch (searchText) {
        case 'assigned':
          return filterAssigned(card);
        case 'unassigned':
          return !filterAssigned(card);
        default:
          return filterNames(card);
      }
    });
    return newFiltered;
  }

  useEffect(() => {
    const newFiltered = getFilteredCards(searchText, cards);
    setFilteredCards(newFiltered);
  }, [searchText, cards]);

  function handleNameCardClicked(cardId: string) {
    setSelectedCard(cardId);
  }

  async function handlePokemonSelected(pokemonId: number) {
    if (selectedCard) {
      const newCard = await updateCard({ id: selectedCard, pokemon: pokemonId });
      return newCard;
    }
    return;
  }

  function getUpdatedCards(prevCards: ClientCard[], newCard: ClientCard) {
    const updatedCards = prevCards.map((card) => {
      if (card.id === newCard.id) {
        newCard;
      }
      return card;
    });
    return updatedCards;
  }

  const updateMutation = useMutation({
    mutationFn: async (pokemonId: number) => {
      const updatedCard = (await handlePokemonSelected(pokemonId)) as ClientCard;
      const updatedCards = getUpdatedCards(cards, updatedCard);
      return updatedCards;
    },
    onMutate: async (pokemonId: number) => {
      console.log('In OnMutate', pokemonId);
      const queryKey = ['cards'];
      await queryClient.cancelQueries({
        queryKey,
      });

      const prevCards = queryClient.getQueryData(queryKey) as ClientCard[];

      const updatedCards = prevCards.map((card) => {
        if (card.id === selectedCard) {
          return { ...card, pokemon: pokemonId };
        }
        return card;
      });

      if (prevCards) {
        queryClient.setQueryData(queryKey, updatedCards);
      }

      return { prevCards, updatedCards };
    },
    onError: (err, pokemonId, context) => {
      console.error('Error updating card:', err, selectedCard);
      if (context?.prevCards) {
        queryClient.setQueryData(['cards'], context.prevCards);
      }
    },
    onSettled: (pokemonId) => {
      if (pokemonId) {
        queryClient.invalidateQueries({ queryKey: ['cards'] });
      }
    },
  });

  return (
    <>
      <label className="input input-bordered flex items-center gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search Names (Tip: Search assigned or unassigned)"
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
      </div>
      <SelectPokemonModal onSelect={updateMutation.mutate} />
    </>
  );
}
