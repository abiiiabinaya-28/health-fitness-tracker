'use client';
import { useEffect, useState } from 'react';

type Meal = { calories: number };
type Workout = { id: number; type: string; duration: number };

interface Stats {
  workouts: number;
  calories: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({ workouts: 0, calories: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const workoutsRes = await fetch('/api/workouts');
      const mealsRes = await fetch('/api/meals');

      const workouts: Workout[] = await workoutsRes.json();
      const meals: Meal[] = await mealsRes.json();

      const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0);

      setStats({ workouts: workouts.length, calories: totalCalories });
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 bg-green-600 border-b border-green-700">
            <h1 className="text-2xl font-bold text-white">🏋️ Fitness Dashboard</h1>
          </div>

          <div className="p-8">
            <p className="text-gray-600 mb-8">Welcome! Here&apos;s an overview of your progress:</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-3">
                  <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-blue-600">{stats.workouts}</h2>
                <p className="text-gray-700 font-medium">Total Workouts</p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-100 text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-3">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-green-600">{stats.calories}</h2>
                <p className="text-gray-700 font-medium">Total Calories</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a href="/workouts" className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                  <h3 className="font-medium text-blue-600">Add Workout</h3>
                  <p className="text-sm text-gray-500 mt-1">Log your exercise session</p>
                </a>
                <a href="/meals" className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                  <h3 className="font-medium text-green-600">Log Meal</h3>
                  <p className="text-sm text-gray-500 mt-1">Track your nutrition</p>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
