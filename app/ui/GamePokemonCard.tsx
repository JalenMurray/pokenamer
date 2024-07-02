import { ClientCard } from '../lib/definitions';
import { getPokemon, getSpriteURL, getTypeGradient } from '../pokemon_data/queries';
import CardModal from './CardModal';
import PokemonGif from './PokemonGif';

export default function GamePokemonCard({ card, gameId }: { card: ClientCard; gameId: string }) {
  if (!card.pokemon) {
    return;
  }

  function handleClick() {
    const cardModal = document.getElementById(`card_modal_${card.id}`) as HTMLDialogElement;
    cardModal.showModal();
  }

  const pokemon = getPokemon(card.pokemon);

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
          <div className="w-32 h-32 flex items-center justify-center">
            <PokemonGif name={pokemon.name} />
          </div>
        </div>
      </div>
      <CardModal card={card} gameId={gameId} />
    </>
  );
}
