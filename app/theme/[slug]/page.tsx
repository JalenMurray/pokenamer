import { notFound } from 'next/navigation';
import { Theme } from '@/app/lib/definitions';
import { themes, allPokemon } from '@/data';
import { useState } from 'react';
import SelectPokemonModal from '@/app/components/SelectPokemonModal';
import PokemonCard from '@/app/components/PokemonCard';

async function getTheme(name: string) {
  const theme = themes[name.toLowerCase()];
  if (theme === undefined) {
    notFound();
  }
  return theme;
}

function NameCard({ name }: { name: string }) {
  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 text-center">
      <h1>{name}</h1>
    </div>
  );
}

export default async function Page({ params }: { params: { slug: string } }) {
  const theme = await getTheme(params.slug);

  return (
    <main className="flex min-h-screen w-full flex-col gap-12 p-24 bg-slate-900 text-white">
      <h1 className="text-4xl">{theme.name}</h1>
      <div className="grid gap-4 grid-cols-7">
        {theme.names.map((name) => (
          <PokemonCard
            pokemon={{
              id: 1,
              name: 'milotic',
              types: ['water', 'fairy'],
              evolution_chain: [1, 2, 3],
            }}
            name={{ name: name, named: true }}
          />
          // <NameCard key={name} name={name} />
        ))}
      </div>
    </main>
  );
}
