import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fakir Mohan Patra | Senior Backend & Distributed Systems Engineer',
  description: 'Interactive portfolio & architectural blueprints of Fakir Mohan Patra (IIT Madras M.Tech). Distributed systems, .NET 10, Orleans, Kafka, NATS, GreptimeDB, and real-time Voice AI.',
  keywords: [
    'Fakir Mohan Patra',
    'Backend Engineer',
    'Distributed Systems',
    'IIT Madras',
    '.NET 10',
    'Microsoft Orleans',
    'Apache Kafka',
    'NATS JetStream',
    'GreptimeDB',
    'Python',
    'FastAPI',
    'Real-Time Voice AI'
  ],
  authors: [{ name: 'Fakir Mohan Patra' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#CCFF00',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen selection:bg-funky-lime selection:text-black">
        {children}
      </body>
    </html>
  );
}
