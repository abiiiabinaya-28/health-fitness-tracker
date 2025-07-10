'use client';
import { useState, useEffect } from 'react';

type Meal = {
  id: number;
  food: string;
  calories: number;
};

export default function MealsPage() {
  const [food, setFood] = useState('');
  const [calories, setCalories] = useState('');
  const [meals, setMeals] = useState<Meal[]>([]);

  const fetchMeals = async () => {
    const res = await fetch('/api/meals');
    const data = await res.json();
    setMeals(data);
  };

  useEffect(() => {
    fetchMeals();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/meals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 1, food, calories: Number(calories) }),
    });
    setFood('');
    setCalories('');
    fetchMeals();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 bg-green-600 border-b border-green-700">
            <h1 className="text-2xl font-bold text-white">Meal Tracker</h1>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="food" className="block text-sm font-medium text-gray-700 mb-1">
                  Food Item
                </label>
                <input
                  id="food"
                  type="text"
                  placeholder="Salad, Chicken, etc."
                  value={food}
                  onChange={(e) => setFood(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="calories" className="block text-sm font-medium text-gray-700 mb-1">
                  Calories
                </label>
                <input
                  id="calories"
                  type="number"
                  placeholder="300"
                  value={calories}
                  onChange={(e) => setCalories(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out"
              >
                Log Meal
              </button>
            </form>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Meal History</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                {meals.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {meals.map((m) => (
                      <li key={m.id} className="py-3 flex justify-between">
                        <span className="font-medium">{m.food}</span>
                        <span className="text-gray-600">{m.calories} cal</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-center py-4">No meals logged yet</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
