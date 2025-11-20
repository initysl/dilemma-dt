'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchScenario, submitDecision } from '@/lib/api';
import { Scenario, DecisionPoint, FrameworkAnalysis } from '@/lib/types';
import DecisionNode from '@/components/scenario/decision-node';
import FrameworkAnalysisDisplay from '@/components/scenario/framework-analysis';
import ConsequenceReveal from '@/components/scenario/consequence-reveal';

export default function ScenarioPage() {
  const params = useParams();
  const router = useRouter();
  const scenarioId = params.id as string;

  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<FrameworkAnalysis | null>(null);
  const [consequence, setConsequence] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Load scenario
  useEffect(() => {
    fetchScenario(scenarioId).then(setScenario).catch(console.error);
  }, [scenarioId]);

  const currentDecisionPoint = scenario?.decision_points.find(
    (dp) => dp.step === currentStep
  );

  const handleChoice = async (choiceId: string, choiceText: string) => {
    if (!scenario) return;

    setLoading(true);
    setAnalysis(null);
    setConsequence(null);

    try {
      const response = await submitDecision({
        scenario_id: scenario.id,
        session_id: sessionId,
        step: currentStep,
        choice_id: choiceId,
        choice_text: choiceText,
      });

      setSessionId(response.session_id);
      setAnalysis(response.analysis);
      setConsequence(response.consequence);
      setIsComplete(response.is_final);

      // Auto-advance to next step after 3 seconds
      if (!response.is_final && response.next_step) {
        setTimeout(() => {
          setCurrentStep(response.next_step!);
          setAnalysis(null);
          setConsequence(null);
        }, 3000);
      }
    } catch (error) {
      console.error('Failed to submit decision:', error);
      alert('Failed to submit decision. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!scenario) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto'></div>
          <p className='mt-4 text-slate-600'>Loading scenario...</p>
        </div>
      </div>
    );
  }

  return (
    <main className='min-h-screen bg-linear-to-br from-slate-50 to-slate-100'>
      {/* Header */}
      <div className='bg-white shadow-sm border-b'>
        <div className='max-w-4xl mx-auto px-8 py-6'>
          <button
            onClick={() => router.push('/')}
            className='text-purple-600 hover:text-purple-700 mb-2 flex items-center gap-2'
          >
            ← Back to scenarios
          </button>
          <h1 className='text-3xl font-bold text-slate-900'>
            {scenario.title}
          </h1>
          <p className='text-slate-600 mt-1'>{scenario.description}</p>

          {/* Progress */}
          <div className='mt-4'>
            <div className='flex items-center gap-2 text-sm text-slate-600'>
              <span>
                Step {currentStep} of {scenario.decision_points.length}
              </span>
            </div>
            <div className='w-full bg-slate-200 rounded-full h-2 mt-2'>
              <div
                className='bg-purple-600 h-2 rounded-full transition-all duration-500'
                style={{
                  width: `${
                    (currentStep / scenario.decision_points.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='max-w-4xl mx-auto px-8 py-12'>
        {!isComplete ? (
          <>
            {/* Decision Point */}
            {currentDecisionPoint && !analysis && (
              <DecisionNode
                decisionPoint={currentDecisionPoint}
                onChoice={handleChoice}
                loading={loading}
              />
            )}

            {/* Analysis */}
            {analysis && (
              <div className='space-y-6'>
                <FrameworkAnalysisDisplay analysis={analysis} />
                {consequence && <ConsequenceReveal consequence={consequence} />}
                {!isComplete && (
                  <p className='text-center text-slate-500 text-sm'>
                    Continuing to next step...
                  </p>
                )}
              </div>
            )}
          </>
        ) : (
          /* Completion Screen */
          <div className='bg-white rounded-xl p-8 shadow-sm border text-center'>
            <div className='text-6xl mb-4'>🎯</div>
            <h2 className='text-3xl font-bold text-slate-900 mb-4'>
              Scenario Complete
            </h2>
            <p className='text-slate-600 mb-8'>
              You've navigated through all decision points. Every choice
              revealed different ethical perspectives and consequences.
            </p>

            {analysis && <FrameworkAnalysisDisplay analysis={analysis} />}
            {consequence && (
              <div className='mt-6'>
                <ConsequenceReveal consequence={consequence} />
              </div>
            )}

            <div className='mt-8 flex gap-4 justify-center'>
              <button
                onClick={() => window.location.reload()}
                className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium'
              >
                Try Again
              </button>
              <button
                onClick={() => router.push('/')}
                className='bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-3 rounded-lg font-medium'
              >
                Back to Scenarios
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
