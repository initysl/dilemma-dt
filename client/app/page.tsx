import Link from 'next/link';
import { fetchScenarios } from '@/lib/api';

export default async function Home() {
  const scenarios = await fetchScenarios();

  return (
    <main className='min-h-screen bg-linear-to-br from-slate-50 to-slate-100'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='max-w-6xl mx-auto px-8 py-6'>
          <h1 className='text-4xl font-bold text-slate-900'>
            Dilemma Decision Tree
          </h1>
          <p className='text-slate-600 mt-2'>
            Navigate complex ethical scenarios. Every choice matters.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className='max-w-6xl mx-auto px-8 py-12'>
        {/* Action Bar */}
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-2xl font-semibold text-slate-800'>
            Available Scenarios
          </h2>
          <Link
            href='/generate'
            className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors'
          >
            🤖 Generate New Scenario
          </Link>
        </div>

        {/* Scenarios Grid */}
        {scenarios.length === 0 ? (
          <div className='text-center py-16'>
            <p className='text-slate-500 text-lg'>No scenarios available.</p>
            <Link
              href='/generate'
              className='text-purple-600 hover:underline mt-2 inline-block'
            >
              Generate your first scenario →
            </Link>
          </div>
        ) : (
          <div className='grid gap-6 md:grid-cols-2'>
            {scenarios.map((scenario) => (
              <Link
                key={scenario.id}
                href={`/scenario/${scenario.id}`}
                className='bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-200 hover:border-purple-300'
              >
                <h3 className='text-xl font-semibold text-slate-900 mb-2'>
                  {scenario.title}
                </h3>
                <p className='text-slate-600 mb-4 line-clamp-2'>
                  {scenario.description}
                </p>

                {/* Metadata */}
                <div className='flex flex-wrap gap-2'>
                  <span className='text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium'>
                    {scenario.category}
                  </span>
                  <span className='text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium'>
                    {scenario.difficulty}
                  </span>
                  <span className='text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium'>
                    ~{scenario.estimated_time} mins
                  </span>
                  <span className='text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-medium'>
                    {scenario.decision_points.length} decisions
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
