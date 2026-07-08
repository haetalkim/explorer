# Explorer

A research instrument for the study *How Interface Design Shapes Epistemic
Exploration* (Jiin Hur, Teachers College, Columbia University). Explorer
compares how graduate students reason about a contested educational topic
when conversing with an Oracle-type AI chatbot versus a multi-lens group
chat of named analytical perspectives.

## Participant flow

Pre/post questionnaires are administered separately in Qualtrics; the app
covers consent and the conversation session, linked by participant code.

1. **Study information & consent** — plain-language study page; no hypothesis
   or condition details are revealed.
2. **Setup** — participant code plus AI platform familiarity. The session
   then renders in a skin replicating that platform (ChatGPT, Claude, or
   Gemini; "other" uses a neutral Explorer look), so the conversation feels
   like the participant's everyday tool.
3. **Initial take** — the participant states their current position in a
   sentence or two, before any condition is revealed.
4. **Random assignment** — 50/50 between Standard AI Chatbot (oracle) and
   Multi-Lens Explorer. Assignment happens here so baseline opinion is not
   influenced by interface type.
5. **Lens choice** (multi-lens only) — the participant selects two
   analytical lenses from eight.
6. **Session** — both conditions use the same study question and the same
   opening message (the initial take). Oracle is a single-assistant chat;
   multi-lens is a group chat where chosen lenses reply in turn, a third
   can be invited, and quoted replies address one lens directly.
7. **Completion** — session log saved automatically to the cloud, then
   redirect to the Qualtrics closing questionnaire (linked by participant ID).

## Conditions

Participants are randomly assigned (between-subjects) to one of two
conditions; a third is available behind a flag:

| Condition | URL override | Description |
| --- | --- | --- |
| Oracle | `?cond=oracle` | Standard single-assistant chat |
| Multi-lens | `?cond=multilens` | Group chat with the two chosen lenses; a third can be invited |
| Synthesis (beta) | `?cond=synthesis` | Multi-lens plus save-and-synthesize panel |

Assignment persists per browser session; the `?cond=` parameter lets the
researcher balance groups manually.

## Researcher configuration

Participants never see API keys. Configure the backend once:

- Open the app with `?setup=1` to choose a provider (OpenAI, Anthropic,
  Google, or demo mode), enter a key, and test the connection; or
- Provide `VITE_OPENAI_API_KEY`, `VITE_ANTHROPIC_API_KEY`, or
  `VITE_GOOGLE_API_KEY` env vars.

If no key is configured, sessions run in demo mode with hedged,
non-fabricated canned responses on the study topic.

## Session data & survey handoff

On completion the app automatically POSTs the full session JSON (participant
ID, condition, initial take, transcript, timestamps) to a cloud endpoint,
then sends the participant to the Qualtrics exit survey.

### 1. Configure environment variables

Copy `.env.example` to `.env` and set:

| Variable | Purpose |
| --- | --- |
| `VITE_POST_SURVEY_URL` | Qualtrics exit survey URL. Use `{participantId}` where the ID should be inserted. |
| `VITE_RECORD_SUBMIT_URL` | HTTPS endpoint that accepts a JSON POST body. |
| `VITE_RECORD_SUBMIT_TOKEN` | Optional shared secret (recommended in production). |

Example:

```env
VITE_POST_SURVEY_URL=https://your-school.qualtrics.com/jfe/form/SV_abc123?participantId={participantId}
VITE_RECORD_SUBMIT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
VITE_RECORD_SUBMIT_TOKEN=choose-a-long-random-string
```

In Qualtrics, add an embedded data field named `participantId` (or map the
query parameter in Survey Flow) so exit responses link back to the
conversation log.

### 2. Option A — Google Sheet (recommended)

**Full walkthrough:** [`docs/SETUP-GOOGLE-SHEET.md`](docs/SETUP-GOOGLE-SHEET.md)

Summary:

1. Create a Google Sheet → Extensions → Apps Script → paste `scripts/google-sheet-logger.gs`
2. Set `SCRIPT_TOKEN` in the script, run **`setupSheet`** once, then deploy as **Web app** (Anyone)
3. Open Explorer with `?setup=1` → **Data logging** → paste URL + token → **Test save**
4. Confirm a test row appears in the **Sessions** tab

Each completed session appends one row; the full JSON lives in the **payload** column.

### 3. Option B — Supabase (scalable, queryable)

1. Create a free [Supabase](https://supabase.com) project
2. Create a table, e.g. `sessions (id uuid default gen_random_uuid(), participant_id text, payload jsonb, created_at timestamptz default now())`
3. Enable Row Level Security and add an insert policy for the `anon` role
4. Set `VITE_RECORD_SUBMIT_URL` to  
   `https://YOUR_PROJECT.supabase.co/rest/v1/sessions`
5. Set `VITE_RECORD_SUBMIT_TOKEN` to your Supabase **anon** key and send rows as:

```json
{ "participant_id": "P-1234", "payload": { ...full record... } }
```

For Supabase you may prefer a small Edge Function that validates the token
and writes the row; the Google Sheet route works without any backend code.

### What the participant sees

The thank-you page saves in the background, shows a brief status line, and
auto-redirects to Qualtrics after ~3 seconds. A **Continue to closing
questionnaire** button is always available. There is no download step for
participants — logs go straight to your sheet or database.


## Development

```bash
npm install
npm run dev     # http://localhost:5173
npm run build
```

## Structure

```
src/
  lib/         study constants, lens framework, API client, assignment, config
  components/  icons, lens dots, buttons, option list, markdown-subset renderer
  screens/     consent, setup, lens choice, session (all conditions),
               completion, researcher setup, design documentation, case study
  skins/       ChatGPT / Claude / Gemini chat skins (tokens + structure)
  App.jsx      participant flow state machine
  index.css    design tokens and base styles
```

## Tech

React 19 + Vite. No other runtime dependencies.
