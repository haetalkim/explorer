/**
 * Explorer → Google Sheet session logger
 *
 * Full setup guide: docs/SETUP-GOOGLE-SHEET.md
 *
 * Quick steps:
 * 1. Create a Google Sheet (see guide for column layout).
 * 2. Extensions → Apps Script → paste this entire file → Save.
 * 3. Run setupSheet once from the editor (▶ next to setupSheet).
 * 4. Set SCRIPT_TOKEN below to a long random string.
 * 5. Deploy → New deployment → Web app
 *      Execute as: Me
 *      Who has access: Anyone
 * 6. Copy the deployment URL into Explorer (?setup=1 → Data logging).
 */

const SCRIPT_TOKEN = 'REPLACE_WITH_A_LONG_RANDOM_STRING';
const SHEET_NAME = 'Sessions';

/** Run once from the Apps Script editor to create/format the sheet tab. */
function setupSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  const headers = [
    'participantId',
    'timestamp',
    'condition',
    'platformSkin',
    'initialTake',
    'payload',
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length)
    .setFontWeight('bold')
    .setBackground('#f3f3f3');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);

  SpreadsheetApp.flush();
  Logger.log('Sheet "' + SHEET_NAME + '" is ready.');
}

function doGet(e) {
  try {
    authorize_(e);
    return jsonResponse_({
      ok: true,
      message: 'Explorer session logger is running.',
      sheet: SHEET_NAME,
    });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

function doPost(e) {
  try {
    authorize_(e);

    if (!e.postData || !e.postData.contents) {
      throw new Error('Empty request body');
    }

    const record = JSON.parse(e.postData.contents);
    const sheet = getSheet_();

    sheet.appendRow([
      record.participantId || '',
      record.timestamp || new Date().toISOString(),
      record.condition || '',
      record.platformSkin || '',
      truncate_(record.initialTake || '', 500),
      JSON.stringify(record),
    ]);

    return jsonResponse_({ ok: true });
  } catch (err) {
    return jsonResponse_({ ok: false, error: String(err) });
  }
}

function authorize_(e) {
  if (!SCRIPT_TOKEN || SCRIPT_TOKEN === 'REPLACE_WITH_A_LONG_RANDOM_STRING') {
    return;
  }
  const token = (e && e.parameter && e.parameter.token) || '';
  if (token !== SCRIPT_TOKEN) {
    throw new Error('Unauthorized — token mismatch');
  }
}

function getSheet_() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error(
      'Sheet "' + SHEET_NAME + '" not found. Run setupSheet() from the editor first.'
    );
  }
  return sheet;
}

function truncate_(text, max) {
  const s = String(text);
  return s.length <= max ? s : s.slice(0, max - 1) + '…';
}

function jsonResponse_(body) {
  return ContentService.createTextOutput(JSON.stringify(body))
    .setMimeType(ContentService.MimeType.JSON);
}
