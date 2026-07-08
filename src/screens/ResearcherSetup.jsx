import { useState } from 'react';
import Button from '../components/Button.jsx';
import { loadConfig, saveConfig, PROVIDERS, DEFAULT_MODELS } from '../lib/config.js';
import { chat } from '../lib/api.js';
import {
  sampleSessionRecord,
  submitSessionRecord,
  testSheetConnection,
} from '../lib/records.js';

// Hidden researcher configuration, reachable only via ?setup=1.
// Participants never see this screen or enter API keys.

export default function ResearcherSetup({ onDone }) {
  const [config, setConfig] = useState(loadConfig);
  const [status, setStatus] = useState(null); // null | 'testing' | 'ok' | error string
  const [sheetStatus, setSheetStatus] = useState(null);

  const setKey = (provider, value) => {
    setConfig((c) => ({ ...c, keys: { ...c.keys, [provider]: value } }));
    setStatus(null);
  };

  const testConnection = async () => {
    setStatus('testing');
    try {
      await chat({
        provider: config.provider,
        apiKey: config.keys[config.provider],
        model: config.models[config.provider],
        system: 'Reply with the single word: ok',
        messages: [{ role: 'user', content: 'ping' }],
      });
      setStatus('ok');
    } catch (err) {
      setStatus(err.message);
    }
  };

  const testSheet = async () => {
    setSheetStatus('testing');
    try {
      saveConfig(config);
      await testSheetConnection();
      setSheetStatus('ok');
    } catch (err) {
      setSheetStatus(err.message);
    }
  };

  const testSave = async () => {
    setSheetStatus('testing');
    try {
      saveConfig(config);
      await submitSessionRecord(sampleSessionRecord());
      setSheetStatus('saved');
    } catch (err) {
      setSheetStatus(err.message);
    }
  };

  const save = () => {
    saveConfig(config);
    onDone();
  };

  return (
    <div className="study-page">
      <main className="study-column">
        <p className="eyebrow">Researcher configuration</p>
        <h1 className="section-title" style={{ marginBottom: 12 }}>
          Session backend
        </h1>
        <p className="body-text" style={{ color: 'var(--ink-secondary)', marginBottom: 40 }}>
          This screen is only reachable via the ?setup=1 URL parameter.
          Configuration is stored in this browser and never shown to
          participants. Keys can also be provided via VITE_* env vars.
        </p>

        <div className="field">
          <span className="field-label">Provider</span>
          <div className="option-list">
            {PROVIDERS.map((p) => (
              <button
                key={p.id}
                type="button"
                className={`option-row ${config.provider === p.id ? 'selected' : ''}`}
                onClick={() => {
                  setConfig((c) => ({ ...c, provider: p.id }));
                  setStatus(null);
                }}
              >
                <span className="option-radio" aria-hidden="true" />
                {p.name}
                {p.id !== 'demo' && (
                  <span className="caption" style={{ marginLeft: 'auto' }}>
                    {config.models[p.id] || DEFAULT_MODELS[p.id]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {config.provider !== 'demo' && (
          <>
            <div className="field">
              <span className="field-label">API key</span>
              <input
                type="password"
                className="text-input"
                style={{ fontFamily: 'var(--font-mono)' }}
                value={config.keys[config.provider]}
                onChange={(e) => setKey(config.provider, e.target.value)}
                placeholder={
                  config.provider === 'openai'
                    ? 'sk-...'
                    : config.provider === 'anthropic'
                      ? 'sk-ant-...'
                      : 'AIza...'
                }
              />
            </div>

            <div className="field">
              <span className="field-label">Model</span>
              <input
                type="text"
                className="text-input"
                style={{ fontFamily: 'var(--font-mono)' }}
                value={config.models[config.provider]}
                onChange={(e) =>
                  setConfig((c) => ({
                    ...c,
                    models: { ...c.models, [c.provider]: e.target.value },
                  }))
                }
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
              <Button
                variant="secondary"
                onClick={testConnection}
                disabled={status === 'testing' || !config.keys[config.provider]}
              >
                {status === 'testing' ? 'Testing…' : 'Test connection'}
              </Button>
              {status === 'ok' && (
                <span className="caption" style={{ color: 'var(--ink)' }}>
                  Connection verified.
                </span>
              )}
              {status && status !== 'ok' && status !== 'testing' && (
                <span className="caption" style={{ color: 'var(--danger)' }}>
                  {status}
                </span>
              )}
            </div>
          </>
        )}

        <hr className="hairline-divider" style={{ margin: '8px 0 32px' }} />

        <h2 className="section-title" style={{ fontSize: 20, marginBottom: 8 }}>
          Data logging
        </h2>
        <p className="body-text" style={{ color: 'var(--ink-secondary)', marginBottom: 24 }}>
          Connects to your Google Sheet via Apps Script. Setup guide:{' '}
          <code style={{ fontSize: 13 }}>docs/SETUP-GOOGLE-SHEET.md</code>
        </p>

        <div className="field">
          <span className="field-label">Sheet logger URL</span>
          <input
            type="url"
            className="text-input"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}
            value={config.recordSubmitUrl}
            onChange={(e) => {
              setConfig((c) => ({ ...c, recordSubmitUrl: e.target.value.trim() }));
              setSheetStatus(null);
            }}
            placeholder="https://script.google.com/macros/s/…/exec"
          />
        </div>

        <div className="field">
          <span className="field-label">Shared token</span>
          <input
            type="password"
            className="text-input"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}
            value={config.recordSubmitToken}
            onChange={(e) => {
              setConfig((c) => ({ ...c, recordSubmitToken: e.target.value.trim() }));
              setSheetStatus(null);
            }}
            placeholder="Same as SCRIPT_TOKEN in Apps Script"
          />
        </div>

        <div className="field">
          <span className="field-label">Post-survey URL</span>
          <input
            type="url"
            className="text-input"
            style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}
            value={config.postSurveyUrl}
            onChange={(e) =>
              setConfig((c) => ({ ...c, postSurveyUrl: e.target.value.trim() }))
            }
            placeholder="https://…qualtrics.com/…?participantId={participantId}"
          />
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            flexWrap: 'wrap',
            marginBottom: 32,
          }}
        >
          <Button
            variant="secondary"
            onClick={testSheet}
            disabled={sheetStatus === 'testing' || !config.recordSubmitUrl}
          >
            {sheetStatus === 'testing' ? 'Testing…' : 'Test sheet connection'}
          </Button>
          <Button
            variant="secondary"
            onClick={testSave}
            disabled={
              sheetStatus === 'testing' ||
              !config.recordSubmitUrl ||
              !config.recordSubmitToken
            }
          >
            Test save
          </Button>
          {sheetStatus === 'ok' && (
            <span className="caption" style={{ color: 'var(--ink)' }}>
              Connection verified.
            </span>
          )}
          {sheetStatus === 'saved' && (
            <span className="caption" style={{ color: 'var(--ink)' }}>
              Test row saved — check your Google Sheet.
            </span>
          )}
          {sheetStatus &&
            sheetStatus !== 'ok' &&
            sheetStatus !== 'saved' &&
            sheetStatus !== 'testing' && (
              <span className="caption" style={{ color: 'var(--danger)' }}>
                {sheetStatus}
              </span>
            )}
        </div>

        <Button size="lg" onClick={save}>
          Save and exit setup
        </Button>
      </main>
    </div>
  );
}
