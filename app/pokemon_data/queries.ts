import { Pokemon, PokemonType, PokemonObjects } from './definitions';
import {
  BlackWhite2Ids,
  BlackWhiteIds,
  DiamondPearlPokedexIds,
  HeartGoldSoulSilverIds,
  LegendsArceusIds,
  LetsGoPikachuEeveeIds,
  ORASIds,
  PlatinumPokedexIds,
  RubySaphireEmeraldPokedexIds,
  ScarletVioletIds,
  SunMoonIds,
  SwordShieldIds,
  UltraSunMoonIds,
  XYIds,
  allPokemon,
  typeColors,
} from './pokemon_data';

export function removeDash(name: string) {
  return name.replace('-', '');
}

export function getSpriteURL(name: string) {
  return `https://play.pokemonshowdown.com/sprites/xyani/${removeDash(name)}.gif`;
}

function filterPokemonByIDRange(start: number, end: number): PokemonObjects {
  return Object.fromEntries(
    Object.entries(allPokemon).filter(([key, value]) => {
      const numKey = parseInt(key, 10);
      return numKey >= start && numKey <= end;
    })
  );
}

export function getPokemon(query: string | number): Pokemon {
  if (typeof query === 'string') {
    const pokemon = Object.values(allPokemon).filter((pokemon) => pokemon.name === query)[0];
    if (!pokemon) {
      return {
        id: 0,
        name: 'ERROR',
        types: ['water'],
        evolution_chain: [0],
      };
      // throw new Error(`Pokemon with name ${query} not found`);
    }
    return pokemon;
  } else {
    return allPokemon[query];
  }
}

function getIdArray(names: string[]) {
  console.log(names.map((name) => getPokemon(name.toLowerCase()).id));
}

function getGamePokedex(gameName: string) {
  switch (gameName) {
    case 'RubySaphireEmerald':
      return RubySaphireEmeraldPokedexIds.map((id) => getPokemon(id));
    case 'DiamondPearl':
      return DiamondPearlPokedexIds.map((id) => getPokemon(id));
    case 'Platinum':
      return PlatinumPokedexIds.map((id) => getPokemon(id));
    case 'HeartGoldSoulSilver':
      return HeartGoldSoulSilverIds.map((id) => getPokemon(id));
    case 'BlackWhite':
      return BlackWhiteIds.map((id) => getPokemon(id));
    case 'BlackWhite2':
      return BlackWhite2Ids.map((id) => getPokemon(id));
    case 'XY':
      return XYIds.map((id) => getPokemon(id));
    case 'ORAS':
      return ORASIds.map((id) => getPokemon(id));
    case 'SunMoon':
      return SunMoonIds.map((id) => getPokemon(id));
    case 'UltraSunMoon':
      return UltraSunMoonIds.map((id) => getPokemon(id));
    case 'LetsGoPikachuEevee':
      return LetsGoPikachuEeveeIds.map((id) => getPokemon(id));
    case 'SwordShield':
      return SwordShieldIds.map((id) => getPokemon(id));
    // case 'BrillaintDiamondShiningPearl':
    //   getIdArray(BlackWhite2Names);
    case 'LegendsArceus':
      return LegendsArceusIds.map((id) => getPokemon(id));
    case 'ScarletViolet':
      return ScarletVioletIds.map((id) => getPokemon(id));
    default:
      return [];
  }
}

export const gen1Pokemon: PokemonObjects = filterPokemonByIDRange(1, 151);
export const gen2Pokemon: PokemonObjects = filterPokemonByIDRange(152, 251);
export const gen3Pokemon: PokemonObjects = filterPokemonByIDRange(252, 386);
export const gen4Pokemon: PokemonObjects = filterPokemonByIDRange(387, 493);
export const gen5Pokemon: PokemonObjects = filterPokemonByIDRange(494, 649);
export const gen6Pokemon: PokemonObjects = filterPokemonByIDRange(650, 721);
export const gen7Pokemon: PokemonObjects = filterPokemonByIDRange(722, 809);
export const gen8Pokemon: PokemonObjects = filterPokemonByIDRange(810, 905);
export const gen9Pokemon: PokemonObjects = filterPokemonByIDRange(906, 1025);

export const fireRedLeafGreenPokedex: Pokemon[] = Object.values(gen1Pokemon);
export const rubySaphireEmeraldPokedex: Pokemon[] = getGamePokedex('RubySaphireEmerald');
export const diamondPearlPokedex: Pokemon[] = getGamePokedex('DiamondPearl');
export const platinumPokedex: Pokemon[] = getGamePokedex('Platinum');
export const heartGoldSoulSilver: Pokemon[] = getGamePokedex('HeartGoldSoulSilver');
export const blackWhitePokedex: Pokemon[] = getGamePokedex('BlackWhite');
export const blackWhite2Pokedex: Pokemon[] = getGamePokedex('BlackWhite2');
export const xYPokedex: Pokemon[] = getGamePokedex('XY');
export const ORASPokedex: Pokemon[] = getGamePokedex('ORAS');
export const sunMoonPokedex: Pokemon[] = getGamePokedex('SunMoon');
export const ultraSunMoonPokedex: Pokemon[] = getGamePokedex('UltraSunMoon');
export const letsGoPikachuEeveePokedex: Pokemon[] = getGamePokedex('LetsGoPikachuEevee');
export const swordShieldPokedex: Pokemon[] = getGamePokedex('SwordShield');
// export const brilliantDiamondShiningPearlPokedex: Pokemon[] = getGamePokedex(
//   'BrilliantDiamondShiningPearl'
// );
export const legendsArceusPokedex: Pokemon[] = getGamePokedex('LegendsArceus');
export const scarletVioletPokedex: Pokemon[] = getGamePokedex('ScarletViolet');

export function getEvoChain(pokemon: Pokemon): (Pokemon | Pokemon[])[] {
  const evoChainIds = pokemon.evolution_chain;
  const evoChain = evoChainIds.map((i: number | number[]) => {
    if (Array.isArray(i)) {
      return i.map((j: number) => getPokemon(j));
    } else {
      return getPokemon(i);
    }
  });
  return evoChain;
}

function getCurrEvoIndex(pokemon: Pokemon): number {
  const evoChain = getEvoChain(pokemon);
  return evoChain.reduce<number>((acc, link, i) => {
    if (Array.isArray(link)) {
      const pokemonInLink = link.filter((evo) => evo.id === pokemon.id);
      return pokemonInLink.length !== 0 ? i : acc;
    } else {
      return link.id === pokemon.id ? i : acc;
    }
  }, 0);
}

export function getNextEvo(pokemon: Pokemon): Pokemon | Pokemon[] {
  const evoChain = getEvoChain(pokemon);
  const currIndex = getCurrEvoIndex(pokemon);

  if (currIndex === evoChain.length - 1) {
    return pokemon;
  }

  return evoChain[currIndex + 1];
}

export function getPrevEvo(pokemon: Pokemon): Pokemon {
  const evoChain = getEvoChain(pokemon);
  const currIndex = getCurrEvoIndex(pokemon);

  if (currIndex === 0) {
    return pokemon;
  }

  return evoChain[currIndex - 1] as Pokemon;
}

export function getTypeGradient(
  types: PokemonType[],
  displayType: string
): {
  backgroundImage: string;
  backgroundBlendMode?: string;
} {
  if (types.length === 1) {
    return { backgroundImage: `linear-gradient(to right, black, ${typeColors[types[0]]}` };
  } else {
    const blackGradient =
      displayType === 'modal'
        ? 'linear-gradient(to right, black 10%, rgba(0, 0, 0, 0.5) 20%, transparent 30%)'
        : 'linear-gradient(to right, black, transparent)';
    return {
      backgroundImage: `${blackGradient}, linear-gradient(to right, ${typeColors[types[1]]}, ${
        typeColors[types[0]]
      })`,
      backgroundBlendMode: 'multiply',
    };
  }
}
