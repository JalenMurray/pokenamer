import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col gap-12 p-24 bg-slate-900 text-white">
      Nothing Here! Go to{' '}
      <Link className="btn btn-primary" href={'/themes'}>
        Themes
      </Link>
    </main>
  );
}
