// Session record submission. The browser POSTs the full JSON log to a
// researcher-configured endpoint on completion (see docs/SETUP-GOOGLE-SHEET.md).
// Settings come from ?setup=1 (localStorage) or VITE_* env vars.

import { loadConfig } from './config.js';

const BACKUP_KEY = 'explorer.pendingRecord';

function getRecordConfig() {
  const config = loadConfig();
  return {
    submitUrl: config.recordSubmitUrl,
    submitToken: config.recordSubmitToken,
    postSurveyUrl: config.postSurveyUrl,
  };
}

function isGoogleAppsScript(url) {
  return url.includes('script.google.com');
}

function buildSubmitUrl(urlBase, token) {
  if (!token) return urlBase;
  const parsed = new URL(urlBase);
  parsed.searchParams.set('token', token);
  return parsed.toString();
}

// Returns the post-survey redirect URL with {participantId} and {condition}
// replaced. `condition` should be the raw Qualtrics value (standard /
// explorer) so Qualtrics embedded data stays consistent.
export function getPostSurveyUrl(participantId, condition) {
  const { postSurveyUrl } = getRecordConfig();
  if (!postSurveyUrl) return null;
  return postSurveyUrl
    .replaceAll('{participantId}', encodeURIComponent(participantId ?? ''))
    .replaceAll('{condition}', encodeURIComponent(condition ?? ''));
}

export function backupRecord(record) {
  try {
    sessionStorage.setItem(BACKUP_KEY, JSON.stringify(record));
  } catch {
    // Ignore quota errors; the in-memory record is still on the page.
  }
}

export function clearRecordBackup() {
  sessionStorage.removeItem(BACKUP_KEY);
}

export async function testSheetConnection() {
  const { submitUrl, submitToken } = getRecordConfig();
  if (!submitUrl) throw new Error('Sheet logger URL not configured');

  const url = buildSubmitUrl(submitUrl, submitToken);
  const testUrl = url.includes('?') ? `${url}&test=1` : `${url}?test=1`;

  const res = await fetch(testUrl);
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.ok === false) {
    throw new Error(data.error || `Connection failed (${res.status})`);
  }
  return data;
}

export async function submitSessionRecord(record) {
  const { submitUrl, submitToken } = getRecordConfig();
  if (!submitUrl) {
    return { ok: false, error: 'not_configured' };
  }

  const url = buildSubmitUrl(submitUrl, submitToken);
  const body = JSON.stringify(record);

  // Google Apps Script rejects CORS preflight on application/json.
  // text/plain avoids preflight and still parses as JSON in doPost.
  const headers = isGoogleAppsScript(submitUrl)
    ? { 'Content-Type': 'text/plain;charset=utf-8' }
    : { 'Content-Type': 'application/json' };

  if (submitToken && !isGoogleAppsScript(submitUrl)) {
    headers.Authorization = `Bearer ${submitToken}`;
  }

  const res = await fetch(url, { method: 'POST', headers, body });

  if (!res.ok) {
    throw new Error(`Save failed (${res.status})`);
  }

  const data = await res.json().catch(() => ({ ok: true }));
  if (data.ok === false) {
    throw new Error(data.error || 'Save rejected');
  }

  clearRecordBackup();
  return data;
}

export function sampleSessionRecord() {
  return {
    participantId: 'TEST-SAVE',
    timestamp: new Date().toISOString(),
    topic: 'test',
    condition: 'oracle',
    platformSkin: 'chatgpt',
    initialTake: 'This is a test row from researcher setup.',
    chosenLensIds: null,
    session: {
      durationSec: 0,
      transcript: [{ role: 'user', text: 'Test message' }],
    },
  };
}
