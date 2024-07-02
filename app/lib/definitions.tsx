import { Schema } from '@/amplify/data/resource';

export type Card = Schema['Card']['type'];
export type Game = Schema['Game']['type'];

export type ClientCard = {
  id: string;
  name: string;
  pokemon?: number;
};

export type ClientGame = {
  id: string;
  name: string;
  themeIdentifier: string;
  cards: ClientCard[];
};
