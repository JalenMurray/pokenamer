import { useState } from 'react';
import { Theme } from '../lib/definitions';
import { getRandomItems } from '../utils/utils';
import Link from 'next/link';

export default function ThemeCard({ theme }: { theme: Theme }) {
  return (
    <Link
      href={`/theme/${theme.identifier}`}
      className="w-96 text-lg rounded-2xl border-2 cursor-pointer border-white flex flex-col p-4 text-center"
    >
      <h1 className="text-2xl">{theme.name}</h1>
      <hr />
      <div className="flex gap-2 text-center justify-center items-center">
        {getRandomItems(theme.names, 4).map((name) => (
          <p key={name}>{name}</p>
        ))}
      </div>
    </Link>
  );
}
