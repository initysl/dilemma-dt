import { FrameworkAnalysis } from '@/lib/types';

interface Props {
  analysis: FrameworkAnalysis;
}

const frameworks = [
  {
    key: 'utilitarian' as keyof FrameworkAnalysis,
    name: 'Utilitarian',
    emoji: '⚖️',
    color: 'blue',
  },
  {
    key: 'deontological' as keyof FrameworkAnalysis,
    name: 'Deontological',
    emoji: '📜',
    color: 'green',
  },
  {
    key: 'virtue_ethics' as keyof FrameworkAnalysis,
    name: 'Virtue Ethics',
    emoji: '🎯',
    color: 'purple',
  },
  {
    key: 'care_ethics' as keyof FrameworkAnalysis,
    name: 'Care Ethics',
    emoji: '🤝',
    color: 'pink',
  },
];

export default function FrameworkAnalysisDisplay({ analysis }: Props) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <h3 className="text-xl font-semibold text-slate-900 mb-4">
        Ethical Framework Analysis
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        {frameworks.map((framework) => (
          <div
            key={framework.key}
            className={`p-4 rounded-lg border-2 bg-${framework.color}-50 border-${framework.color}-200`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{framework.emoji}</span>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 mb-1">
                  {framework.name}
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {analysis[framework.key]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-500 text-center">
        No perspective is "correct" – each reveals different moral considerations
      </p>
    </div>
  );
}