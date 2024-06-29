import Image from 'next/image';
import { categories, themes } from '../data';
import CategoryTable from './components/CategoryTable';
import { useEffect } from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col gap-12 p-24 bg-slate-900 text-white">
      <h1>Testing</h1>
      {categories.categories.map((category) => (
        <CategoryTable key={category.name} category={category} />
      ))}
    </main>
  );
}
