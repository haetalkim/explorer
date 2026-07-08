import { useEffect, useState } from 'react';
import Button from '../components/Button.jsx';
import { PI_EMAIL } from '../lib/study.js';
import {
  backupRecord,
  clearRecordBackup,
  getPostSurveyUrl,
  submitSessionRecord,
} from '../lib/records.js';

// Thank-you page. Saves the session log to the cloud automatically, then
// sends the participant to the Qualtrics closing questionnaire.

export default function Completion({ record, onRestart }) {
  // Use the raw Qualtrics cond value for the redirect URL so Qualtrics
  // embedded data (standard / explorer) stays consistent in the exit survey.
  const surveyUrl = getPostSurveyUrl(
    record.participantId,
    record.qualtricsCondRaw ?? record.condition
  );
  const [saveState, setSaveState] = useState('saving'); // saving | saved | error | skipped
  const [redirectIn, setRedirectIn] = useState(null);

  const saveRecord = async () => {
    setSaveState('saving');
    backupRecord(record);
    try {
      const result = await submitSessionRecord(record);
      if (result.error === 'not_configured') {
        setSaveState('skipped');
        return;
      }
      clearRecordBackup();
      setSaveState('saved');
    } catch {
      setSaveState('error');
    }
  };

  useEffect(() => {
    saveRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-redirect to Qualtrics a few seconds after a successful save.
  useEffect(() => {
    if (!surveyUrl || saveState !== 'saved') return;
    setRedirectIn(3);
    const tick = setInterval(() => {
      setRedirectIn((n) => (n <= 1 ? null : n - 1));
    }, 1000);
    const go = setTimeout(() => {
      window.location.href = surveyUrl;
    }, 3000);
    return () => {
      clearInterval(tick);
      clearTimeout(go);
    };
  }, [saveState, surveyUrl]);

  const continueToSurvey = () => {
    if (surveyUrl) window.location.href = surveyUrl;
  };

  const statusLine = () => {
    if (saveState === 'saving') return 'Saving your session…';
    if (saveState === 'saved') {
      return redirectIn
        ? `Session saved. Continuing to the closing questionnaire in ${redirectIn}…`
        : 'Session saved.';
    }
    if (saveState === 'error') {
      return 'We could not save your session automatically. Please try again, then continue.';
    }
    if (saveState === 'skipped') {
      return 'Session complete. Continue to the closing questionnaire when you are ready.';
    }
    return null;
  };

  return (
    <div className="study-page">
      <main className="study-column" style={{ textAlign: 'center', paddingTop: 120 }}>
        <h1 className="display-title" style={{ marginBottom: 16 }}>
          Thank you.
        </h1>
        <p className="body-large" style={{ marginBottom: 8 }}>
          Your conversation is complete. One more short questionnaire to finish.
        </p>
        <p className="caption" style={{ marginBottom: 32, minHeight: 20 }}>
          {statusLine()}
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            alignItems: 'center',
          }}
        >
          {surveyUrl ? (
            <Button
              size="lg"
              onClick={continueToSurvey}
              disabled={saveState === 'saving'}
            >
              Continue to closing questionnaire
            </Button>
          ) : (
            <p className="caption">
              Survey link not configured. Ask the researcher for the closing
              questionnaire.
            </p>
          )}

          {saveState === 'error' && (
            <Button variant="secondary" onClick={saveRecord}>
              Retry save
            </Button>
          )}

          <Button variant="ghost" size="sm" onClick={onRestart}>
            Start a new session
          </Button>
        </div>

        <p className="caption" style={{ marginTop: 48 }}>
          Questions about this study can be directed to {PI_EMAIL}.
        </p>
      </main>
    </div>
  );
}
