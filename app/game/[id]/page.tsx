import { notFound } from 'next/navigation';
import { exGame as game } from '@/data';
import SelectPokemonModal from '@/app/components/SelectPokemonModal';
import PokemonCard from '@/app/components/PokemonCard';
import NameCard from '@/app/components/NameCard';
import CardGrid from '@/app/components/CardGrid';

export default async function Page({ params }: { params: { slug: string } }) {
  return (
    <main className="flex min-h-screen w-full flex-col gap-12 p-24 bg-slate-900 text-white">
      <h1 className="text-4xl">{game.name}</h1>
      <CardGrid game={game} />
    </main>
  );
}
