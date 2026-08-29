const SHEET_NAME = "Appointment Requests";

function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  if (!ss) {
    throw new Error("Open Apps Script from the Google Sheet using Extensions > Apps Script, then run setup().");
  }

  const sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error('Create or rename the sheet tab exactly as "' + SHEET_NAME + '".');
  }

  PropertiesService.getScriptProperties().setProperty("SPREADSHEET_ID", ss.getId());
  Logger.log("Setup complete for: " + ss.getName());
}

function doGet() {
  return ContentService
    .createTextOutput("Kovai Legal Associates appointment service is running.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const spreadsheetId =
      PropertiesService.getScriptProperties().getProperty("SPREADSHEET_ID");

    if (!spreadsheetId) {
      throw new Error("Setup has not been completed. Run setup() once from the Apps Script editor.");
    }

    const ss = SpreadsheetApp.openById(spreadsheetId);
    const sheet = ss.getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error('Sheet "' + SHEET_NAME + '" was not found.');
    }

    const data = (e && e.parameter) ? e.parameter : {};
    const now = new Date();

    const requestId =
      "KLA-" +
      Utilities.formatDate(now, "Asia/Kolkata", "yyyyMMdd-HHmmss-SSS");

    const nextRow = sheet.getLastRow() + 1;

    const rowData = [[
      requestId,
      now,
      data.name || "",
      data.phone || "",
      data.email || "",
      data.appointmentDate || "",
      data.appointmentTime || "",
      data.consultationType || "",
      data.matterType || "",
      data.message || "",
      "NEW",
      "",
      "",
      "",
      "",
      ""
    ]];

    sheet.getRange(nextRow, 1, 1, 16).setValues(rowData);
    sheet.getRange(nextRow, 17).setFormula(
      '=IF(B' + nextRow + '="","",TODAY()-INT(B' + nextRow + '))'
    );

    SpreadsheetApp.flush();

    return ContentService
      .createTextOutput("SUCCESS")
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    console.error(error);

    return ContentService
      .createTextOutput("ERROR: " + error.message)
      .setMimeType(ContentService.MimeType.TEXT);

  } finally {
    try {
      lock.releaseLock();
    } catch (err) {}
  }
}
