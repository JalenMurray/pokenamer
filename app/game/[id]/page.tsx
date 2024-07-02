import { cookiesClient } from '@/app/utils/amplify-utils';
import GameCardTable from '@/app/ui/GameCardTable';
import Navbar from '@/app/ui/Navbar';
import { ClientCard, ClientGame } from '@/app/lib/definitions';
import { getTheme } from '@/app/template_data/queries';
import { notFound } from 'next/navigation';

async function getGame(id: string) {
  const { data: game, errors } = await cookiesClient.models.Game.get({ id });
  if (errors) {
    console.error(errors);
    return undefined;
  }

  if (!game) {
    notFound();
  }

  return game;
}

async function getCards(gameId: string) {
  const { data, errors } = await cookiesClient.models.Card.list({
    selectionSet: ['id', 'name', 'pokemon'],
    filter: {
      gameId: {
        eq: gameId,
      },
    },
  });

  if (errors) {
    console.error(errors);
    return;
  }

  return data;
}

export default async function Page({ params }: { params: { id: string } }) {
  const game = await getGame(params.id);
  const cards = await getCards(params.id);

  if (!game || !cards) {
    return;
  }

  const clientCards: ClientCard[] = cards.map((card) => ({
    id: card.id,
    name: card.name,
    pokemon: card.pokemon || undefined,
  }));

  const clientGame: ClientGame = {
    id: game.id,
    name: game.name,
    themeIdentifier: game.themeIdentifier,
    cards: clientCards,
  };

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen w-full flex-col gap-12 p-24">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl">{game.name}</h1>
          <h1 className="text-2xl">{getTheme(game.themeIdentifier).name}</h1>
        </div>
        <GameCardTable game={clientGame} />
      </main>
    </>
  );
}
