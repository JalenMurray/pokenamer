import Link from 'next/link';
import { fetchGames } from '../lib/actions';
import GamePreview from '../ui/GamePreview';
import { ClientGame } from '../lib/definitions';

export default async function Page() {
  const games = (await fetchGames()) as ClientGame[];

  if (!games) {
    return;
  }

  const sortedGames = games.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <main className="flex min-h-screen w-full flex-col gap-12 p-4 lg:p-24">
      <div className="flex flex-col gap-2">
        <div className="flex gap-8">
          <h1 className="text-5xl">Games</h1>
          <Link href={`/game/new`} className="btn btn-primary text-white">
            New Game
          </Link>
        </div>
        <div className="flex flex-col gap-4 mt-12">
          {sortedGames.map((game) => (
            <GamePreview game={game} key={game.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
