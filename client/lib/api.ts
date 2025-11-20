import { Scenario, DecisionResponse } from './types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export async function fetchScenarios(): Promise<Scenario[]> {
  const response = await fetch(`${API_BASE}/api/scenarios`);
  if (!response.ok) throw new Error('Failed to fetch scenarios');
  return response.json();
}

export async function fetchScenario(id: string): Promise<Scenario> {
  const response = await fetch(`${API_BASE}/api/scenarios/${id}`);
  if (!response.ok) throw new Error('Failed to fetch scenario');
  return response.json();
}

export async function submitDecision(data: {
  scenario_id: string;
  session_id: string | null;
  step: number;
  choice_id: string;
  choice_text: string;
}): Promise<DecisionResponse> {
  const response = await fetch(`${API_BASE}/api/decisions/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Failed to submit decision');
  return response.json();
}

export async function generateScenario(data: {
  topic: string;
  category: string;
  difficulty: string;
  num_decision_points: number;
}): Promise<{ scenario: Scenario; saved: boolean }> {
  const response = await fetch(`${API_BASE}/api/generate/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, save_to_library: true }),
  });

  if (!response.ok) throw new Error('Failed to generate scenario');
  return response.json();
}
