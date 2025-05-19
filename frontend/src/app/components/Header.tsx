// src/components/Header.tsx
'use client';
import Link from 'next/link';


export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <span className="text-xl font-bold">Gimnasio IronWorks</span>
      </div>

      <nav className="space-x-4">
        <Link href="/" className="hover:underline">Inicio</Link>
        <Link href="/trainings" className="hover:underline">Entrenamientos</Link>
        <Link href="/nutrition" className="hover:underline">Nutrición</Link>
        <Link href="/progress" className="hover:underline">Progreso</Link>
      </nav>
    </header>
  );
}


