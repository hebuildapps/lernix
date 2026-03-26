import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-4 text-lg">Sorry — the page you are looking is currently under development.</p>
        <link href="/" className="mt-6 inline-block text-blue-600">Go home</link>
      </div>
    </main>
  );
}