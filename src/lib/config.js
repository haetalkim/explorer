// Researcher-side runtime configuration.
// Participants never see or enter API keys. The researcher configures the
// provider once, either via the hidden setup screen (?setup=1) or via Vite
// env vars (VITE_OPENAI_API_KEY / VITE_ANTHROPIC_API_KEY / VITE_GOOGLE_API_KEY).

const STORAGE_KEY = 'explorer.researcherConfig';

export const DEFAULT_MODELS = {
  openai: 'gpt-4o',
  anthropic: 'claude-opus-4-5',
  google: 'gemini-2.0-flash',
};

export const PROVIDERS = [
  { id: 'openai', name: 'OpenAI' },
  { id: 'anthropic', name: 'Anthropic' },
  { id: 'google', name: 'Google' },
  { id: 'demo', name: 'Demo (canned responses)' },
];

const ENV_KEYS = {
  openai: import.meta.env.VITE_OPENAI_API_KEY || '',
  anthropic: import.meta.env.VITE_ANTHROPIC_API_KEY || '',
  google: import.meta.env.VITE_GOOGLE_API_KEY || '',
};

// Auto-detect which provider to use based on available env keys,
// preferring OpenAI → Anthropic → Google, only if researcher hasn't
// explicitly chosen one via the setup screen.
function detectProvider(storedProvider, keys) {
  if (storedProvider && storedProvider !== 'demo') return storedProvider;
  if (keys.openai) return 'openai';
  if (keys.anthropic) return 'anthropic';
  if (keys.google) return 'google';
  return 'demo';
}

export function loadConfig() {
  let stored = {};
  try {
    stored = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    stored = {};
  }
  const keys = {
    openai: stored.keys?.openai || ENV_KEYS.openai,
    anthropic: stored.keys?.anthropic || ENV_KEYS.anthropic,
    google: stored.keys?.google || ENV_KEYS.google,
  };
  return {
    provider: detectProvider(stored.provider, keys),
    keys,
    models: { ...DEFAULT_MODELS, ...(stored.models || {}) },
    recordSubmitUrl: stored.recordSubmitUrl || import.meta.env.VITE_RECORD_SUBMIT_URL || '',
    recordSubmitToken: stored.recordSubmitToken || import.meta.env.VITE_RECORD_SUBMIT_TOKEN || '',
    postSurveyUrl: stored.postSurveyUrl || import.meta.env.VITE_POST_SURVEY_URL || '',
  };
}

export function saveConfig(config) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
}

// Resolves what the session should actually run against.
// Falls back to demo mode if the chosen provider has no key.
export function resolveRuntime() {
  const config = loadConfig();
  if (config.provider === 'demo') return { provider: 'demo' };
  const apiKey = config.keys[config.provider];
  if (!apiKey) return { provider: 'demo' };
  return {
    provider: config.provider,
    apiKey,
    model: config.models[config.provider],
  };
}
