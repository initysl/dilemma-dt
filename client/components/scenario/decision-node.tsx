import { DecisionPoint } from '@/lib/types';

interface Props {
  decisionPoint: DecisionPoint;
  onChoice: (choiceId: string, choiceText: string) => void;
  loading: boolean;
}

export default function DecisionNode({
  decisionPoint,
  onChoice,
  loading,
}: Props) {
  return (
    <div className='bg-white rounded-xl p-8 shadow-sm border'>
      {/* Context */}
      <div className='mb-6'>
        <div className='prose prose-slate max-w-none'>
          <p className='text-slate-700 leading-relaxed whitespace-pre-line'>
            {decisionPoint.context}
          </p>
        </div>
      </div>

      {/* Prompt */}
      <div className='mb-6'>
        <h3 className='text-xl font-semibold text-slate-900'>
          {decisionPoint.prompt}
        </h3>
      </div>

      {/* Choices */}
      <div className='space-y-3'>
        {decisionPoint.choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => onChoice(choice.id, choice.text)}
            disabled={loading}
            className='w-full text-left p-4 rounded-lg border-2 border-slate-200 hover:border-purple-400 hover:bg-purple-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed group'
          >
            <span className='font-medium text-purple-600 group-hover:text-purple-700'>
              {choice.id})
            </span>{' '}
            <span className='text-slate-800'>{choice.text}</span>
          </button>
        ))}
      </div>

      {loading && (
        <div className='mt-6 text-center'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto'></div>
          <p className='mt-2 text-slate-600 text-sm'>
            Analyzing your decision...
          </p>
        </div>
      )}
    </div>
  );
}
