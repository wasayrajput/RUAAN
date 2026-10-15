import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-cream flex flex-col items-center justify-center px-4 text-center">
      <h1 className="font-serif text-6xl text-brand-black mb-4">404</h1>
      <h2 className="text-xl font-medium text-stone-700 mb-6">Page Not Found</h2>
      <p className="text-stone-500 max-w-md mb-8">
        The luxury edit or page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-brand-black text-white rounded-full text-sm font-semibold tracking-wider uppercase hover:bg-stone-800 transition-colors"
      >
        Return to Boutique
      </Link>
    </div>
  );
}
