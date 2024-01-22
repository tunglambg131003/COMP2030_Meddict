// Compiled using undefined undefined (TypeScript 4.9.5)
type Entry = {
    worksheet_name: string;
    col_coordinate: number;
    row_coordinate: number;
};

function onEdit(e: any) {
    // get rows, cols, sheet
    // if exists -> update 
    // if not exsits -> add in the last cols
    let isOldValueUndefined: boolean = (e.oldValue == null);
    let state: string = "UPDATE";
    if (isOldValueUndefined) {
        state = "INSERT";
    }
    // Lock for preventing concurrent access & update
    const documentLock = LockService.getDocumentLock();
    documentLock.tryLock(5000);
    if (!documentLock.hasLock()) {
        return;
    }
    try {
        update_cache(state, e);
    } catch (error) {
        return "Error: " + error;
    }
    finally {
        documentLock.releaseLock();
    }
}

function update_cache(state: string, e: any) {
    const sheet = e.source;
    const worksheet_name = sheet.getActiveSheet().getName();
    if (worksheet_name == "update_cache" || worksheet_name == "Suggestion") {
        return;
    }
    const worksheet = sheet.getSheetByName(worksheet_name);
    const coordinates = e.range;
    const col_coordinate = coordinates.columnEnd;
    const row_coordinate = coordinates.rowEnd;
    var entry: Entry = {
        worksheet_name: worksheet_name,
        col_coordinate: col_coordinate,
        row_coordinate: row_coordinate
    };
    // get (B, C, D, E, F) of the row
    Logger.log(row_coordinate);
    Logger.log(typeof(row_coordinate))
    var content_range = worksheet.getRange(row_coordinate, 2, 1, 5);
    var content = content_range.getValues()[0];
    Logger.log(content);
    // cache search
    var cache_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("update_cache");
    var last_row = cache_sheet.getLastRow();
    var range = cache_sheet.getRange(5, 1, last_row - 3, 3);
    var key = range.getValues(); 
    Logger.log(key);
    var index = -1;
    for (var i = 0; i < key.length - 1; i++) {
        const row = key[i];
        if (row[1] == entry.worksheet_name && row[2] == entry.row_coordinate) {
            index = i + 5;
            break;
        }
    }

    var new_row = [state, entry.worksheet_name, '', content[0], content[1], content[2], content[3], content[4]];
    if (index == -1) {
        // add new row, with coordinates and content
        cache_sheet.appendRow(new_row);
        const last_row = cache_sheet.getLastRow();
        // add hyperlink
        const cell = cache_sheet.getRange(last_row, 3);
        const formula = '=HYPERLINK("#gid=' + sheet.getSheetId() + '&range=' + worksheet.getRange(row_coordinate, 1).getA1Notation() + '";"' + row_coordinate + '")';
        // Logger.log(formula);
        cell.setFormula(formula);
    } else {
        // update the row
        const range = cache_sheet.getRange(index, 1, 1, 8);
        range.setValues([new_row]);
        const cell = cache_sheet.getRange(index, 3);
        const formula = '=HYPERLINK("#gid=' + sheet.getSheetId() + '&range=' + worksheet.getRange(row_coordinate, 1).getA1Notation() + '";"' + row_coordinate + '")';
        // Logger.log(formula);
        cell.setFormula(formula);
    }
}

function renderJSON(){
    // get all the rows in the cache
    // render JSON 
    const cache_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("update_cache");
    const last_row = cache_sheet.getLastRow();
    const range = cache_sheet.getRange(5, 1, last_row - 3, 8);
    const values = range.getValues();
    const data = [];
    for (var i = 0; i < values.length - 1; i++) {
        const row = values[i];
        const en = row[3];
        const vn = row[4];
        if (en == "" || vn == "") {
            continue;
        }
        const entry = {
            en: row[3],
            vn: row[4],
            en_type: row[5],
            vn_type: row[6],
            illustration: row[7]
        };
        data.push(entry);
    }
    const json = JSON.stringify(data);
    Logger.log(json);

    // clear cache
    const cache_last_row = cache_sheet.getLastRow();
    const cache_range = cache_sheet.getRange(5, 1, cache_last_row - 3, 8);
    cache_range.clearContent();
    // Logger.log("Cleared");
    return json;
}

function submitToMedDictDB(){
    const user = Session.getActiveUser().getEmail();
    // check if user is in the whitelist ALLOWED_USERS

    if (ALLOWED_USERS.includes(user)){
        // MsgBox 
        const ui = SpreadsheetApp.getUi();
        const response = ui.alert('Submit to MedDict DB', 'Are you sure you want to submit?', ui.ButtonSet.YES_NO);
        // Process the user's response.
        if (response == ui.Button.YES) {
            // User clicked "Yes".
            Logger.log("Submit to MedDict DB");
        } else {
            // User clicked "No" or X in the title bar.
            Logger.log("Cancel");
            return;
        }
    }
    else {
        // MsgBox to ask if user is confirmed to change to tell admin to check the update
        const ui = SpreadsheetApp.getUi();
        const response = ui.alert('Submit to MedDict DB', 'Are you sure you want to ask admins for these changing?', ui.ButtonSet.YES_NO);
        // Process the user's response.
        if (response == ui.Button.YES) {
            // User clicked "Yes".
            Logger.log("Ask admins for these changing");
            MailApp.sendEmail(ALLOWED_USERS[0], "MedDict Update", "Please check the update");
        } else {
            // User clicked "No" or X in the title bar.
            Logger.log("Cancel");
            return;
        }
    }
}