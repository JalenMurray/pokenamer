'use client';

import { notFound, redirect } from 'next/navigation';
import { getTheme } from '@/app/template_data/queries';
import PreviewNameCard from '@/app/ui/PreviewNameCard';
import Navbar from '@/app/ui/Navbar';
import Link from 'next/link';

export default function Page({ params }: { params: { slug: string } }) {
  const theme = getTheme(params.slug);
  if (!theme) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex min-h-screen w-full flex-col gap-12 p-24">
        <div className="flex gap-8">
          <h1 className="text-4xl">{theme.name}</h1>
          <Link
            href={`/game/new?theme=${theme.identifier}`}
            className="btn  btn-primary text-white"
          >
            Create Game with Theme
          </Link>
        </div>
        <div className="grid gap-4 grid-cols-6">
          {theme.names.map((name) => (
            <PreviewNameCard key={name} name={name} />
          ))}
        </div>
      </main>
    </>
  );
}
