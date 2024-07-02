'use client';
import { ClientCard } from '../lib/definitions';

export default function GameNameCard({
  card,
  onClick,
}: {
  card: ClientCard;
  onClick: (id: string) => void;
}) {
  function handleClick() {
    onClick(card.id);
    const selectPokemonModal = document.getElementById(`select_pokemon_modal`) as HTMLDialogElement;
    selectPokemonModal.showModal();
  }

  return (
    <>
      <div
        className="card w-128 h-40 bg-neutral hover:bg-base-300 text-white cursor-pointer text-center items-center justify-center"
        onClick={handleClick}
      >
        <h1 className="text-2xl">{card.name}</h1>
      </div>
    </>
  );
}
