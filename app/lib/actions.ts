'use server';

import { z } from 'zod';
import { cookiesClient } from '../utils/amplify-utils';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Game, Card } from './definitions';
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
  });

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
  });
  console.log(resp);

  redirect(`/game/${gameId}`);
}

export async function updateCard(
  toUpdate: { id: string; name?: string; pokemon?: number },
  gameId: string
) {
  const { data: updatedCard, errors } = await cookiesClient.models.Card.update(toUpdate);
  if (errors) {
    console.error(errors);
  }
  revalidatePath(`/game/${gameId}`);
}
