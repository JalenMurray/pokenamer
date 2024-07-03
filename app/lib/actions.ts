'use server';

import { z } from 'zod';
import { cookiesClient } from '../utils/amplify-utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Game, Card, ClientGame, ClientCard } from './definitions';
import { themes } from '../template_data/template_data';

const GameFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  themeIdentifier: z.string(),
});

const CreateGame = GameFormSchema.omit({ id: true });

export async function createGame(formData: FormData) {
  const { name, themeIdentifier } = CreateGame.parse({
    name: formData.get('name'),
    themeIdentifier: formData.get('themeIdentifier'),
  });
  const { data: newGame, errors } = await cookiesClient.models.Game.create({
    name,
    themeIdentifier,
  } as any);

  if (errors) {
    console.error(errors);
    return;
  }
  const gameId = (newGame as Game).id;
  const owner = (newGame as Game).owner;

  // Create Cards
  const names = themes[themeIdentifier].names as string[];
  const resp = await cookiesClient.mutations.createInitialCards({
    names,
    gameId,
    owner,
  } as any);
  console.log(resp);

  redirect(`/game/${gameId}`);
}

export async function fetchGameCards(id: string) {
  const { data: cards, errors } = await cookiesClient.models.Card.list({
    selectionSet: ['id', 'name', 'pokemon'],
    filter: {
      gameId: {
        eq: id,
      },
    },
  });

  if (errors) {
    console.error(errors);
  }

  if (!cards) {
    return undefined;
  }

  return cards.map<ClientCard>((card) => ({
    id: card.id,
    name: card.name,
    pokemon: card.pokemon || undefined,
  }));
}

export async function fetchGame(id: string) {
  const { data: game, errors } = await cookiesClient.models.Game.get({ id });
  if (errors) {
    console.error(errors);
    return undefined;
  }
  if (!game) {
    return undefined;
  }

  const cards = await fetchGameCards(id);

  if (!cards) {
    return undefined;
  }

  return {
    id: game.id,
    name: game.name,
    themeIdentifier: game.themeIdentifier,
    cards,
  };
}

export async function fetchGames() {
  const { data: games, errors } = await cookiesClient.models.Game.list();
  if (errors) {
    console.error(errors);
  }
  if (!games) {
    return undefined;
  }
  const clientGames = games.map(async (game) => {
    const cards = await fetchGameCards(game.id);
    return { id: game.id, name: game.name, themeIdentifier: game.themeIdentifier, cards };
  });
  return await Promise.all(clientGames);
}

export async function updateCard(toUpdate: { id: string; name?: string; pokemon?: number }) {
  const { data: updatedCard, errors } = await cookiesClient.models.Card.update(toUpdate as any);
  if (errors) {
    console.error(errors);
  }
  if (!updatedCard) {
    return;
  }
  const updatedClientCard: ClientCard = {
    id: updatedCard.id,
    name: updatedCard.name,
    pokemon: updatedCard.pokemon || undefined,
  };
  return updatedClientCard;
}
