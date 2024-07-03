import { cookiesClient } from '@/app/utils/amplify-utils';
import GameCardTable from '@/app/ui/GameCardTable';
import Navbar from '@/app/ui/Navbar';
import { ClientCard, ClientGame } from '@/app/lib/definitions';
import { getTheme } from '@/app/template_data/queries';
import { notFound } from 'next/navigation';
import { fetchGame, fetchGameCards } from '@/app/lib/actions';
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query';

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['game'],
    queryFn: async () => fetchGame(params.id),
  });

  await queryClient.prefetchQuery({
    queryKey: ['cards'],
    queryFn: async () => fetchGameCards(params.id),
  });

  const game = await fetchGame(params.id);

  if (!game) {
    return;
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex min-h-screen w-full flex-col gap-12 p-24">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl">{game.name}</h1>
          <h1 className="text-2xl">{getTheme(game.themeIdentifier).name}</h1>
        </div>
        <GameCardTable game={game} />
      </main>
    </HydrationBoundary>
  );
}
