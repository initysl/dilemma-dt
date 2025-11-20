'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { generateScenario } from '@/lib/api';

export default function GeneratePage() {
  const router = useRouter();
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('business');
  const [difficulty, setDifficulty] = useState('intermediate');
  const [numSteps, setNumSteps] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await generateScenario({
        topic: topic.trim(),
        category,
        difficulty,
        num_decision_points: numSteps,
      });

      // Redirect to the new scenario
      router.push(`/scenario/${result.scenario.id}`);
    } catch (err) {
      setError('Failed to generate scenario. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='min-h-screen bg-linear-to-br from-slate-50 to-slate-100'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='max-w-3xl mx-auto px-8 py-6'>
          <button
            onClick={() => router.push('/')}
            className='text-purple-600 hover:text-purple-700 mb-2 flex items-center gap-2'
          >
            ← Back
          </button>
          <h1 className='text-3xl font-bold text-slate-900'>
            🤖 Generate Scenario with AI
          </h1>
          <p className='text-slate-600 mt-2'>
            Describe an ethical dilemma and let AI create a complete scenario
          </p>
        </div>
      </div>

      {/* Form */}
      <div className='max-w-3xl mx-auto px-8 py-12'>
        <div className='bg-white rounded-xl p-8 shadow-sm border space-y-6'>
          {/* Topic */}
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Topic / Ethical Dilemma *
            </label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="E.g., 'A software engineer discovers a security vulnerability that could expose user data'"
              className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
              rows={4}
            />
          </div>

          {/* Category */}
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className='w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500'
            >
              <option value='business'>Business</option>
              <option value='medical'>Medical</option>
              <option value='personal'>Personal</option>
              <option value='civic'>Civic</option>
            </select>
          </div>

          {/* Difficulty */}
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Difficulty Level
            </label>
            <div className='grid grid-cols-3 gap-3'>
              {['beginner', 'intermediate', 'advanced'].map((level) => (
                <button
                  key={level}
                  onClick={() => setDifficulty(level)}
                  className={`px-4 py-3 rounded-lg border-2 font-medium capitalize transition-colors ${
                    difficulty === level
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Number of Steps */}
          <div>
            <label className='block text-sm font-medium text-slate-700 mb-2'>
              Decision Points: {numSteps}
            </label>
            <input
              type='range'
              min='2'
              max='5'
              value={numSteps}
              onChange={(e) => setNumSteps(parseInt(e.target.value))}
              className='w-full'
            />
            <div className='flex justify-between text-xs text-slate-500 mt-1'>
              <span>2 (Quick)</span>
              <span>5 (Complex)</span>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg'>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleGenerate}
            disabled={loading}
            className='w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white py-4 rounded-lg font-medium text-lg transition-colors'
          >
            {loading ? (
              <span className='flex items-center justify-center gap-2'>
                <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
                Generating scenario...
              </span>
            ) : (
              '✨ Generate Scenario'
            )}
          </button>

          <p className='text-xs text-slate-500 text-center'>
            Generation typically takes 10-15 seconds
          </p>
        </div>
      </div>
    </main>
  );
}
