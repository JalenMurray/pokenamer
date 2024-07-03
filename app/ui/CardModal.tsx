import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCard } from '../lib/actions';
import { ClientCard } from '../lib/definitions';
import { Pokemon } from '../pokemon_data/definitions';
import { getNextEvo, getPokemon, getPrevEvo, getTypeGradient } from '../pokemon_data/queries';
import BranchEvolutionModal from './BranchEvolutionModal';
import PokemonGif from './PokemonGif';

export default function CardModal({ card }: { card: ClientCard }) {
  const pokemon = getPokemon(card.pokemon as number);
  const queryClient = useQueryClient();

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
    mutationFn: async (nextPokemonId: number) => {
      const prevCards = queryClient.getQueryData(['cards']) as ClientCard[];
      const updatedCard = (await updateCard({ id: card.id, pokemon: nextPokemonId })) as ClientCard;
      const updatedCards = getUpdatedCards(prevCards, updatedCard);
      return updatedCards;
    },
    onMutate: async (nextPokemonId: number) => {
      const queryKey = ['cards'];
      await queryClient.cancelQueries({
        queryKey,
      });

      const prevCards = queryClient.getQueryData(queryKey) as ClientCard[];

      const updatedCards = prevCards.map((card_i) => {
        if (card_i.id === card.id) {
          return { ...card_i, pokemon: nextPokemonId };
        }
        return card_i;
      });

      if (prevCards) {
        queryClient.setQueryData(queryKey, updatedCards);
      }

      return { prevCards, updatedCards };
    },
    onError: (err, nextPokemonId, context) => {
      console.error('Error updating card:', err);
      if (context?.prevCards) {
        queryClient.setQueryData(['cards'], context.prevCards);
      }
    },
    onSettled: (nextPokemonId) => {
      if (nextPokemonId) {
        queryClient.invalidateQueries({ queryKey: ['cards'] });
      }
    },
  });

  async function evolve(nextPokemonId: number) {
    console.log(`Evolving Pokemon to ${getPokemon(nextPokemonId).name}`);
    updateMutation.mutate(nextPokemonId);
  }

  function handleEvolutionClick(e: React.MouseEvent<HTMLButtonElement>) {
    const buttonType = e.currentTarget.textContent;
    console.log(`${buttonType} Button Clicked`);
    const nextPokemon = buttonType === 'Evolve' ? getNextEvo(pokemon) : getPrevEvo(pokemon);
    if (Array.isArray(nextPokemon)) {
      const evolutionModal = document.getElementById(
        `evolution_modal_${card.id}`
      ) as HTMLDialogElement;
      evolutionModal.showModal();
    } else {
      evolve(nextPokemon.id);
    }
  }

  async function unassignPokemon() {
    const evolutionModal = document.getElementById(`card_modal_${card.id}`) as HTMLDialogElement;
    evolutionModal.close();
    updateMutation.mutate(0);
  }

  return (
    <>
      <dialog id={`card_modal_${card.id}`} className="modal">
        <div
          className="modal-box min-w-[60vw] min-h-[350px]"
          style={getTypeGradient(pokemon.types, 'modal')}
        >
          <div className="grid grid-cols-2">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col p-4">
                <h1 className="text-3xl">{card.name}</h1>
                <h1 className="text-base">
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </h1>
              </div>
              <div className="flex gap-4">
                <button
                  className="btn btn-warning text-white w-[40%]"
                  disabled={getPrevEvo(pokemon) === pokemon}
                  onClick={handleEvolutionClick}
                >
                  De-evolve
                </button>
                <button
                  className="btn btn-success text-white w-[40%]"
                  disabled={getNextEvo(pokemon) === pokemon}
                  onClick={handleEvolutionClick}
                >
                  Evolve
                </button>
              </div>
              <div>
                <button className="btn btn-error text-white w-[90%]" onClick={unassignPokemon}>
                  Unassign Pokemon
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center w-128 h-64">
              <PokemonGif
                name={pokemon.name}
                extraProps={{
                  style: { objectFit: 'contain', objectPosition: 'center' },
                  className: 'w-full h-full',
                }}
              />
            </div>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      {Array.isArray(getNextEvo(pokemon)) && (
        <BranchEvolutionModal
          cardId={card.id}
          options={getNextEvo(pokemon) as Pokemon[]}
          onSelect={evolve}
        />
      )}
    </>
  );
}
