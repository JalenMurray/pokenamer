import { Pokemon } from '../pokemon_data/definitions';
import ModalPokemonCard from './ModalPokemonCard';

export default function BranchEvolutionModal({
  cardId,
  options,
  onSelect,
}: {
  cardId: string;
  options: Pokemon[];
  onSelect: (pokemonId: number) => void;
}) {
  return (
    <dialog id={`evolution_modal_${cardId}`} className="modal">
      <div className="modal-box min-w-[60vw] min-h-[350px]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col p-4">
            <h1 className="text-3xl">This pokemon can evolve into multiple things!</h1>
            <h1 className="text-base">Pick One</h1>
          </div>
          {options.map((pokemon) => (
            <ModalPokemonCard
              pokemon={pokemon}
              modalId={`evolution_modal_${cardId}`}
              onClick={() => onSelect(pokemon.id)}
            />
          ))}
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
