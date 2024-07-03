'use client';

import { createGame } from '@/app/lib/actions';
import { themes } from '@/app/template_data/template_data';
import { useState } from 'react';

export default function Page({ searchParams }: { searchParams?: { theme?: string } }) {
  const [submitting, setSubmitting] = useState<boolean>(false);

  return submitting ? (
    <div className="flex gap-4 min-h-screen justify-center items-center">
      <h1 className="text-3xl">Creating Game</h1>
      <span className="loading loading-spinner w-24" />
    </div>
  ) : (
    <>
      <main className="flex min-h-screen w-full flex-col gap-12 p-24">
        <h1 className="text-4xl">New Game</h1>
        <form
          className="flex flex-col gap-8"
          action={createGame}
          onSubmit={() => setSubmitting(true)}
        >
          <input
            type="text"
            placeholder="Game Name"
            name="name"
            required
            className="input input-bordered w-full max-w-xl"
          />
          <select
            className="select select-bordered w-full max-w-xl"
            name="themeIdentifier"
            required
          >
            <option disabled selected={searchParams?.theme === undefined}>
              Theme
            </option>
            {Object.values(themes).map((theme) => (
              <option
                value={theme.identifier}
                key={theme.identifier}
                selected={searchParams?.theme === theme.identifier}
              >
                {theme.name}
              </option>
            ))}
          </select>
          <button className="btn btn-primary w-full max-w-xl">Create New Game</button>
        </form>
      </main>
    </>
  );
}
