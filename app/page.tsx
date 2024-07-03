import Link from 'next/link';
import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/themes');
  return (
    <main className="flex min-h-screen w-full flex-col gap-12 p-24 bg-slate-900 text-white">
      Nothing Here! Go to{' '}
      <Link className="btn btn-primary" href={'/themes'}>
        Themes
      </Link>
    </main>
  );
}
