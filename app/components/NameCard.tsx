'use client';
import { Game } from '../lib/definitions';

export default function NameCard({
  name,
  game,
  onClick,
}: {
  name: string;
  game: Game | undefined;
  onClick: (name: string) => void;
}) {
  function handleClick() {
    if (!game) {
      return;
    }
    onClick(name);
    const selectPokemonModal = document.getElementById(
      `select_pokemon_modal_${game.id}`
    ) as HTMLDialogElement;
    selectPokemonModal.showModal();
  }

  return (
    <>
      <div
        className="card w-128 h-40 bg-slate-700 text-white cursor-pointer text-center items-center justify-center"
        onClick={handleClick}
      >
        <h1 className="text-2xl">{name}</h1>
      </div>
    </>
  );
}
