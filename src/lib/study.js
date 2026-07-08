// Study constants derived from the IRB protocol:
// "How Interface Design Shapes Epistemic Exploration" (Hur, TC Columbia).
// Pre/post questionnaires are administered separately in Qualtrics;
// this app covers consent, setup, and the conversation session itself.

export const TOPIC = {
  id: 'ai-vs-peer-feedback',
  prompt:
    'Which is more effective for improving student writing: AI-generated feedback or peer feedback?',
  shortTitle: 'AI vs. peer feedback for writing',
};

export const STUDY_TITLE = 'Exploring Ideas with AI Tools';
export const STUDY_INSTITUTION = 'Teachers College, Columbia University';
export const PI_NAME = 'Jiin Hur';
export const PI_EMAIL = 'jh4887@tc.columbia.edu';

export const PLATFORMS = [
  { id: 'chatgpt', name: 'ChatGPT' },
  { id: 'claude', name: 'Claude' },
  { id: 'gemini', name: 'Gemini' },
  { id: 'other', name: 'Other / none' },
];
