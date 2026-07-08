// Condition assignment. Qualtrics pre-survey randomizes the condition and
// passes it as ?cond=standard or ?cond=explorer in the redirect URL.
// Explorer maps those to its internal names and preserves the raw Qualtrics
// value for the post-survey redirect so Qualtrics embedded data stays consistent.
//
// Researcher URL overrides (bypassing Qualtrics) still work:
//   ?cond=oracle | multilens | synthesis

export const CONDITIONS = ['oracle', 'multilens', 'synthesis'];

// Maps Qualtrics condition names → internal Explorer condition names.
const QUALTRICS_COND_MAP = { standard: 'oracle', explorer: 'multilens' };

const STORAGE_KEY = 'explorer.assignment';

export function getAssignment() {
  const raw = new URLSearchParams(window.location.search).get('cond') || '';

  // Qualtrics value (standard / explorer) or researcher override (oracle / multilens).
  const mapped = QUALTRICS_COND_MAP[raw] ?? raw;
  if (mapped && CONDITIONS.includes(mapped)) {
    sessionStorage.setItem(STORAGE_KEY, mapped);
    return mapped;
  }

  const stored = sessionStorage.getItem(STORAGE_KEY);
  if (stored && CONDITIONS.includes(stored)) return stored;

  // Fallback coin flip — only reached when no ?cond param present
  // (e.g. researcher testing directly without Qualtrics).
  const assigned = Math.random() < 0.5 ? 'oracle' : 'multilens';
  sessionStorage.setItem(STORAGE_KEY, assigned);
  return assigned;
}

// Returns the raw Qualtrics cond value from the landing URL (?cond=standard
// or ?cond=explorer). Used when building the post-survey redirect URL so
// Qualtrics receives back the same value its embedded data field expects.
export function getQualtricsCondFromUrl() {
  return new URLSearchParams(window.location.search).get('cond') || null;
}

export function clearAssignment() {
  sessionStorage.removeItem(STORAGE_KEY);
}

export function generateParticipantId() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `P-${n}`;
}
