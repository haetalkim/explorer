# Google Sheet setup for Explorer session logs

This guide connects Explorer to a Google Sheet so every completed session
is saved automatically — no participant downloads.

Estimated time: **10 minutes**.

---

## Step 1 — Create the spreadsheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new blank spreadsheet.
2. Name it something like **Explorer Study Logs 2026**.
3. You do **not** need to create columns manually — the script does that in Step 3.

---

## Step 2 — Add the Apps Script

1. In the spreadsheet: **Extensions → Apps Script**.
2. Delete any code in the editor.
3. Open `scripts/google-sheet-logger.gs` from this repo and **paste the entire file**.
4. Find this line near the top:

   ```javascript
   const SCRIPT_TOKEN = 'REPLACE_WITH_A_LONG_RANDOM_STRING';
   ```

5. Replace it with a secret only you know, for example:

   ```javascript
   const SCRIPT_TOKEN = 'xK9mP2vL8nQ4wR7tY1zA6bC3dE0fG5';
   ```

   Copy this same string — you will paste it into Explorer in Step 5.

6. Click **Save** (disk icon). Name the project **Explorer Logger**.

---

## Step 3 — Initialize the sheet tab

1. In the Apps Script editor, open the function dropdown (top toolbar) and select **`setupSheet`**.
2. Click **Run** (▶).
3. Google will ask for permissions the first time:
   - Click **Review permissions**
   - Choose your Google account
   - Click **Advanced → Go to Explorer Logger (unsafe)** (this is your own script)
   - Click **Allow**
4. Open **View → Logs** — you should see: `Sheet "Sessions" is ready.`
5. Switch back to the spreadsheet — you should see a **Sessions** tab with headers:

   | participantId | timestamp | condition | platformSkin | initialTake | payload |
   | --- | --- | --- | --- | --- | --- |

   The **payload** column holds the full JSON for analysis.

---

## Step 4 — Deploy as a web app

1. In Apps Script: **Deploy → New deployment**.
2. Click the gear icon ⚙ next to "Select type" → choose **Web app**.
3. Settings:
   - **Description:** Explorer session logger
   - **Execute as:** Me
   - **Who has access:** Anyone
4. Click **Deploy**.
5. Copy the **Web app URL**. It looks like:

   ```
   https://script.google.com/macros/s/AKfycbxxxxxxxxxxxxxxxx/exec
   ```

   Keep this URL private — anyone with the URL *and* your token can write rows.

6. If you change the script later, use **Deploy → Manage deployments → Edit → New version → Deploy** so the live URL picks up changes.

---

## Step 5 — Connect Explorer

### Option A — Researcher setup screen (easiest for testing)

1. Run Explorer locally: `npm run dev`
2. Open `http://localhost:5173/?setup=1`
3. Scroll to **Data logging**
4. Paste:
   - **Sheet logger URL** → the Web app URL from Step 4
   - **Shared token** → the same string as `SCRIPT_TOKEN` in the script
   - **Post-survey URL** → your Qualtrics exit link, e.g.  
     `https://your-school.qualtrics.com/jfe/form/SV_abc123?participantId={participantId}`
5. Click **Test sheet connection** — should show "Connection verified."
6. Click **Test save** — a test row should appear in your Google Sheet.
7. Click **Save and exit setup**.

### Option B — Environment variables (for production deploy)

Copy `.env.example` to `.env`:

```env
VITE_RECORD_SUBMIT_URL=https://script.google.com/macros/s/YOUR_ID/exec
VITE_RECORD_SUBMIT_TOKEN=xK9mP2vL8nQ4wR7tY1zA6bC3dE0fG5
VITE_POST_SURVEY_URL=https://your-school.qualtrics.com/jfe/form/SV_abc123?participantId={participantId}
```

Restart the dev server after editing `.env`.

---

## Step 6 — Link Qualtrics

In your **exit survey** (post-conversation questionnaire):

1. Go to **Survey Flow**.
2. Add an **Embedded Data** element at the start.
3. Create a field named **`participantId`**.
4. Set it from the URL query string (Qualtrics: "Set Embedded Data from Panel" or use the `{participantId}` URL parameter).

This links each Qualtrics response to the matching row in your sheet.

---

## Verify end-to-end

1. Complete a full test session as a participant (consent → setup → initial take → chat → thank you).
2. Check the **Sessions** tab — a new row should appear within a few seconds.
3. Confirm you are redirected to Qualtrics after the thank-you page.

---

## Troubleshooting

| Problem | Fix |
| --- | --- |
| "Unauthorized — token mismatch" | Make sure `SCRIPT_TOKEN` in Apps Script exactly matches the token in Explorer setup / `.env`. Redeploy if you changed the script. |
| "Sheet Sessions not found" | Run `setupSheet()` from the Apps Script editor again. |
| Test connection fails | Confirm deployment access is **Anyone**, not "Only myself". |
| Row saves but redirect fails | Set `VITE_POST_SURVEY_URL` or the post-survey field in ?setup=1. |
| CORS / network error | Redeploy the web app as a **new version**. Explorer sends `Content-Type: text/plain` specifically for Google Apps Script. |

---

## Analyzing your data

- **Quick review:** Read `initialTake`, `condition`, and `platformSkin` columns directly in the sheet.
- **Full transcript:** Parse the **payload** JSON column (each cell is one complete session record).
- **Export:** File → Download → CSV for R, SPSS, or Python.

Each row's `payload` includes:

```json
{
  "participantId": "P-4821",
  "timestamp": "2026-07-03T16:20:00.000Z",
  "condition": "multilens",
  "platformSkin": "chatgpt",
  "initialTake": "I lean toward peer feedback because…",
  "chosenLensIds": ["equity", "practical"],
  "session": {
    "durationSec": 842,
    "transcript": [ … ]
  }
}
```
