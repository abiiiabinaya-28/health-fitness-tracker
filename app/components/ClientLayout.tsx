'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-green-50 text-gray-800 font-sans">
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-600">🏋️ FitTrack</h1>
          <nav className="space-x-6 text-sm font-semibold text-gray-700 flex items-center">
            <Link href="/" className="hover:text-green-600">Home</Link>

            {!isLoggedIn && (
              <>
                <Link href="/login" className="hover:text-green-600">Login</Link>
                <Link href="/register" className="hover:text-green-600">Register</Link>
              </>
            )}

            <Link href="/dashboard" className="hover:text-green-600">Dashboard</Link>
            <Link href="/workouts" className="hover:text-green-600">Workouts</Link>
            <Link href="/meals" className="hover:text-green-600">Meals</Link>

            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="text-red-500 hover:text-red-600 transition ml-4"
              >
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">{children}</main>

      <footer className="bg-white border-t mt-12 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} FitTrack. All rights reserved.
      </footer>
    </div>
  );
}
