'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    try {
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('user', JSON.stringify(data.user));
        alert('Login successful!');
        window.location.href = '/dashboard';
      } else {
        alert(data.error || 'Login failed');
      }
    } catch {
      alert('Something went wrong.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-md mx-4">
        <div className="bg-green-600 py-4 px-6">
          <h2 className="text-2xl font-bold text-white text-center">Welcome Back</h2>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="text-green-600 font-medium hover:text-green-700 hover:underline transition"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
