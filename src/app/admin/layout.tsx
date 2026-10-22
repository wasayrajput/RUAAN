import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RUAAN — Executive Brand Operating System & ERP',
  description: 'Private administrative portal for RUAAN Luxury Pret & Fabrics.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#0d0f12] text-gray-100 antialiased selection:bg-[#c5a059] selection:text-black">
      {children}
    </div>
  );
}
