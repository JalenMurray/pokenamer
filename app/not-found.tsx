import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg mb-4">Sorry, the page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/">Go Home</Link>
    </div>
  );
}
