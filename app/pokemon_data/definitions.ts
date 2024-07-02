export type PokemonType =
  | 'normal'
  | 'fire'
  | 'water'
  | 'electric'
  | 'grass'
  | 'ice'
  | 'fighting'
  | 'poison'
  | 'ground'
  | 'flying'
  | 'psychic'
  | 'bug'
  | 'rock'
  | 'ghost'
  | 'dragon'
  | 'dark'
  | 'steel'
  | 'fairy';

export type Pokemon = {
  id: number;
  name: string;
  types: Array<PokemonType>;
  evolution_chain: Array<number | Array<number>>;
};

export type PokemonObjects = {
  [id: number]: Pokemon;
};

export type Card = {
  id: number;
  name: string;
  pokemon: Pokemon | undefined;
  jsx: JSX.Element | undefined;
};

export type GameName = {
  name: string;
  pokemon: Pokemon | undefined;
};

export type Box = {
  [name: string]: Card;
};

export type Game = {
  id: number;
  theme: string;
  name: string;
  box: Box;
};