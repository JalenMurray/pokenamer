import {
  ORASPokedex,
  blackWhite2Pokedex,
  blackWhitePokedex,
  diamondPearlPokedex,
  fireRedLeafGreenPokedex,
  heartGoldSoulSilver,
  legendsArceusPokedex,
  letsGoPikachuEeveePokedex,
  platinumPokedex,
  rubySaphireEmeraldPokedex,
  scarletVioletPokedex,
  sunMoonPokedex,
  swordShieldPokedex,
  ultraSunMoonPokedex,
  xYPokedex,
} from '../pokemon_data/queries';
import { Pokemon, PokemonType } from '../pokemon_data/definitions';
import { allPokemon } from '../pokemon_data/pokemon_data';
import { ClientCard } from '../lib/definitions';

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

function getNewBase(game: string) {
  switch (game) {
    case 'firered':
      return fireRedLeafGreenPokedex;
    case 'leafgreen':
      return fireRedLeafGreenPokedex;
    case 'ruby':
      return rubySaphireEmeraldPokedex;
    case 'saphire':
      return rubySaphireEmeraldPokedex;
    case 'emerald':
      return rubySaphireEmeraldPokedex;
    case 'diamond':
      return diamondPearlPokedex;
    case 'pearl':
      return diamondPearlPokedex;
    case 'platinum':
      return platinumPokedex;
    case 'heartgold':
      return heartGoldSoulSilver;
    case 'soulsilver':
      return heartGoldSoulSilver;
    case 'black':
      return blackWhitePokedex;
    case 'white':
      return blackWhitePokedex;
    case 'black2':
      return blackWhite2Pokedex;
    case 'white2':
      return blackWhite2Pokedex;
    case 'x':
      return xYPokedex;
    case 'y':
      return xYPokedex;
    case 'omegaruby':
      return ORASPokedex;
    case 'alphasaphire':
      return ORASPokedex;
    case 'sun':
      return sunMoonPokedex;
    case 'moon':
      return sunMoonPokedex;
    case 'ultrasun':
      return ultraSunMoonPokedex;
    case 'ultramoon':
      return ultraSunMoonPokedex;
    case 'letsgopikachu':
      return letsGoPikachuEeveePokedex;
    case 'letsgoeevee':
      return letsGoPikachuEeveePokedex;
    case 'sword':
      return swordShieldPokedex;
    case 'shield':
      return swordShieldPokedex;
    case 'legendsarceus':
      return legendsArceusPokedex;
    case 'scarlet':
      return scarletVioletPokedex;
    case 'violet':
      return scarletVioletPokedex;
  }
  return Object.values(allPokemon) as Pokemon[];
}

export function searchPokemon(tokens: string[]) {
  // Check if there is a change in the base
  let base: Pokemon[] = Object.values(allPokemon);
  const gameSearched = tokens.filter((token) => token.substring(0, 5) === 'game:').length !== 0;
  if (gameSearched) {
    const firstGameSearched = tokens
      .filter((token) => token.substring(0, 5) === 'game:')[0]
      .substring(5);
    base = getNewBase(firstGameSearched);
  }

  // Check if there is a type filter
  const typeSearched = tokens.filter((token) => token.substring(0, 5) === 'type:').length !== 0;
  if (typeSearched) {
    base = base.filter((pokemon) => {
      // Iterate through the types and check if the pokemon is of this type
      const typesSearched = tokens.filter((token) => token.substring(0, 5) === 'type:');
      let result = false;
      typesSearched.forEach((token) => {
        if (pokemon.types.includes(token.substring(5) as PokemonType)) {
          result = true;
        }
      });
      return result;
    });
  }

  // Filter on Regular Text
  const searchText = tokens.filter((token) => !token.includes(':') && token !== '');
  if (searchText.length !== 0) {
    return base.filter((pokemon) => {
      let result = false;
      searchText.forEach((text) => {
        if (pokemon.name.includes(text)) {
          result = true;
        }
        if (pokemon.id === parseFloat(text)) {
          result = true;
        }
      });
      return result;
    });
  } else {
    return base;
  }
}

export function getPreviewPokemon(cards: ClientCard[]): ClientCard[] {
  // Filter names that are too long
  const filtered = cards.filter((card) => card.pokemon);

  if (filtered.length < 3) {
    return filtered;
  }

  // Shuffle Names
  const shuffledArray = [...filtered];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  // Return first 3
  return shuffledArray.slice(0, 3);
}
