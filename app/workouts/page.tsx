'use client';
import { useState, useEffect } from 'react';

type Workout = {
  id: number;
  type: string;
  duration: number;
};

export default function WorkoutsPage() {
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  const fetchWorkouts = async () => {
    const res = await fetch('/api/workouts');
    const data: Workout[] = await res.json();
    setWorkouts(data);
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 1, type, duration: Number(duration) }),
    });
    setType('');
    setDuration('');
    fetchWorkouts();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 bg-blue-600 border-b border-blue-700">
            <h1 className="text-2xl font-bold text-white">Workout Tracker</h1>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Workout Type
                </label>
                <input
                  id="type"
                  type="text"
                  placeholder="Running, Yoga, etc."
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)
                </label>
                <input
                  id="duration"
                  type="number"
                  placeholder="30"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out"
              >
                Log Workout
              </button>
            </form>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Workout History</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                {workouts.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {workouts.map((w: Workout) => (
                      <li key={w.id} className="py-3 flex justify-between">
                        <span className="font-medium">{w.type}</span>
                        <span className="text-gray-600">{w.duration} min</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 text-center py-4">No workouts logged yet</p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
