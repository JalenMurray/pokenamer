import { allPokemon, typeColors } from '@/data';
import { Box, Game, Pokemon, PokemonType, ThemeTemplate } from '../lib/definitions';

function filterTooLongWords<T>(names: T[]): T[] {
  const filtered = names.filter((name) => (name as string).length <= 10);
  return filtered;
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...filterTooLongWords(array)];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export function getRandomItems<T>(array: T[], n: number): T[] {
  if (n > array.length) {
    console.error(array);
    throw new Error('The number of items to select cannot be greater than the array length.');
  }
  const shuffledArray = shuffleArray(array);
  return shuffledArray.slice(0, n);
}

// export function getGradientStyles(types: Array<PokemonType>) {
//   if (types.length === 1) {
//     return { backgroundImage: `linear-gradient(to right, black, ${typeColors[types[0]]}` };
//   } else {
//     return {
//       backgroundImage: `linear-gradient(to right, black, transparent), linear-gradient(to right, ${
//         typeColors[types[1]]
//       }, ${typeColors[types[0]]})`,
//       backgroundBlendMode: 'multiply',
//     };
//   }
// }

// export function createBaseBoxFromTheme(theme: Theme): Box {
//   const box: Box = {};
//   theme.names.forEach(
//     (name, i) => (box[name] = { id: i, name: name, pokemon: undefined, jsx: undefined })
//   );
//   return box;
// }

// function getCurrentIndexInChain(chain: Array<number | number[]>, id: number) {
//   for (let i = 0; i < chain.length; i++) {
//     const curr = chain[i];
//     if (Array.isArray(curr)) {
//       if (curr.filter((found_id) => found_id === id).length == 1) {
//         return i;
//       }
//     } else {
//       if (curr === id) {
//         return i;
//       }
//     }
//   }

//   return undefined;
// }

// export function getEvolvedPokemon(pokemon: Pokemon): Pokemon {
//   const evoChain = pokemon.evolution_chain;

//   // Check if it is the final evo
//   if (pokemon.id === evoChain[evoChain.length - 1]) {
//     return pokemon;
//   }

//   const currIndex = getCurrentIndexInChain(evoChain, pokemon.id);

//   console.log(currIndex);

//   if (currIndex == undefined) {
//     return pokemon;
//   }

//   const nextPokemon = evoChain[currIndex + 1];

//   if (Array.isArray(nextPokemon)) {
//     return allPokemon[nextPokemon[0]];
//   }

//   return allPokemon[nextPokemon];
// }
