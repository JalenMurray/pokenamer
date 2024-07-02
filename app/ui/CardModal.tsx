import { updateCard } from '../lib/actions';
import { ClientCard } from '../lib/definitions';
import { Pokemon } from '../pokemon_data/definitions';
import { getNextEvo, getPokemon, getPrevEvo, getTypeGradient } from '../pokemon_data/queries';
import BranchEvolutionModal from './BranchEvolutionModal';

export default function CardModal({ card, gameId }: { card: ClientCard; gameId: string }) {
  const pokemon = getPokemon(card.pokemon as number);

  async function evolve(nextPokemonId: number) {
    console.log(`Evolving Pokemon to ${getPokemon(nextPokemonId).name}`);
    await updateCard({ id: card.id, pokemon: nextPokemonId }, gameId);
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
    await updateCard({ id: card.id, pokemon: 0 }, gameId);
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
                  className="btn btn-warning text-white"
                  disabled={getPrevEvo(pokemon) === pokemon}
                  onClick={handleEvolutionClick}
                >
                  De-evolve
                </button>
                <button
                  className="btn btn-success text-white"
                  disabled={getNextEvo(pokemon) === pokemon}
                  onClick={handleEvolutionClick}
                >
                  Evolve
                </button>
              </div>
              <div>
                <button className="btn btn-error text-white" onClick={unassignPokemon}>
                  Unassign Pokemon
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center w-128 h-64">
              <img
                src={`https://play.pokemonshowdown.com/sprites/xyani/${pokemon.name}.gif`}
                alt={pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                style={{ objectFit: 'contain', objectPosition: 'center' }}
                className="w-full h-full"
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
