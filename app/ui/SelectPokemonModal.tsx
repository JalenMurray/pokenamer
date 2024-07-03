import { useEffect, useRef, useState } from 'react';
import { Pokemon } from '../pokemon_data/definitions';
import ModalPokemonCard from './ModalPokemonCard';
import { searchPokemon } from '../utils/utils';
import { useDebouncedCallback } from 'use-debounce';
import { allPokemon } from '../pokemon_data/pokemon_data';
import SelectPokemonSearchHelpModal from './SelectPokemonSearchHelpModal';

export default function SelectPokemonModal({
  onSelect,
}: {
  onSelect: (pokemonId: number) => void;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredPokemon, setFilteredPokemon] = useState<Array<Pokemon>>(Object.values(allPokemon));
  const [pagePokemon, setPagePokemon] = useState<Array<Pokemon>>([]);
  const [pagesToDisplay, setPagesToDisplay] = useState<string[]>([]);
  const listRef = useRef<HTMLHeadingElement>(null);

  const pokemonPerPage = 100;

  useEffect(() => {
    // Set Initial Pokemon
    const totalPages = Math.ceil(filteredPokemon.length / pokemonPerPage);
    setTotalPages(totalPages);
    setPagePokemon(
      filteredPokemon.slice((currentPage - 1) * pokemonPerPage, currentPage * pokemonPerPage)
    );
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    function setPageButtons() {
      const pageNumbers = [];
      const buttonDeviation = 2;

      const showFirst = currentPage > buttonDeviation + 1;
      const showLast = currentPage < totalPages - buttonDeviation;

      if (showFirst) {
        pageNumbers.push('<<');
      }

      pageNumbers.push('<');

      // Generate page buttons within the range
      for (
        let i = Math.max(1, currentPage - buttonDeviation);
        i <= Math.min(totalPages, currentPage + buttonDeviation);
        i++
      ) {
        pageNumbers.push(`${i}`);
      }

      pageNumbers.push('>');

      if (showLast) {
        pageNumbers.push('>>');
      }

      setPagesToDisplay(pageNumbers);
    }
    function updatePagePokemon() {
      setPagePokemon(
        filteredPokemon.slice((currentPage - 1) * pokemonPerPage, currentPage * pokemonPerPage)
      );
    }
    setPageButtons();
    updatePagePokemon();
  }, [currentPage, totalPages, filteredPokemon]);

  const filter = useDebouncedCallback((text: string) => {
    const tokens = text.split(' ');
    const filtered = searchPokemon(tokens) as Pokemon[];
    const totalPages = Math.ceil(filtered.length / pokemonPerPage);
    setTotalPages(totalPages);
    setFilteredPokemon(filtered);
    setCurrentPage(1);
  }, 200);

  function handlePageChange(e: React.MouseEvent<HTMLButtonElement>) {
    const buttonClicked = e.currentTarget.textContent as string;
    switch (buttonClicked) {
      case '>':
        setCurrentPage(currentPage + 1);
        break;
      case '<':
        setCurrentPage(currentPage - 1);
        break;
      case '>>':
        setCurrentPage(totalPages);
        break;
      case '<<':
        setCurrentPage(1);
        break;
      default:
        setCurrentPage(parseInt(buttonClicked, 10));
        break;
    }

    if (listRef.current) {
      setTimeout(() => {
        (listRef.current as HTMLHeadingElement).scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 50);
    }
  }

  function handleClick(pokemonId: number) {
    onSelect(pokemonId);
  }

  function handleHelpClick() {
    const modal = document.getElementById('select_pokemon_help_modal') as HTMLDialogElement;
    modal.showModal();
  }

  return (
    <>
      <dialog id={`select_pokemon_modal`} className="modal">
        <div className="modal-box min-w-[60vw] h-[70vh]">
          <h3 className="font-bold text-lg py-8" ref={listRef}>
            Select a Pokemon to Name!
          </h3>
          <label className="input input-bordered flex items-center gap-2 mb-8">
            <input
              type="text"
              className="grow"
              placeholder="Search Pokemon"
              onChange={(e) => filter(e.target.value.toLowerCase())}
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
            <button className="btn btn-warning btn-sm" onClick={handleHelpClick}>
              Search Tips
            </button>
          </label>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
            {pagePokemon.map((pokemon) => {
              return (
                <ModalPokemonCard
                  pokemon={pokemon}
                  key={pokemon.id}
                  onClick={handleClick}
                  modalId="select_pokemon_modal"
                />
              );
            })}
          </div>
          <div className="flex gap-2 w-full justify-center items-center mt-4 mb-8">
            {pagesToDisplay.map((page) => (
              <button
                className="btn btn-primary"
                key={page}
                onClick={handlePageChange}
                disabled={
                  `${currentPage}` === page ||
                  (page === '<' && currentPage === 1) ||
                  (page === '>' && currentPage === totalPages)
                }
              >
                {page}
              </button>
            ))}
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <SelectPokemonSearchHelpModal />
    </>
  );
}
