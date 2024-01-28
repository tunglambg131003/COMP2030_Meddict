function update_cache(state: string, e: any) {
    const sheet = e.source;
    const worksheet_name = sheet.getActiveSheet().getName();
    if (worksheet_name == "update_cache" || worksheet_name == "Guideline") {
        return;
    }
    if (worksheet_name == "Suggestion") {
        handle_suggestion(e);
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
    Logger.log(index)
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

function submitToMedDictDB(){
    const user = Session.getActiveUser().getEmail();
    // check if user is in the whitelist ALLOWED_USERS
    if (ALLOWED_USERS.includes(user)){
        // MsgBox 
        const ui = SpreadsheetApp.getUi();
        const response = ui.alert('Submit to MedDict DB', 'Are you sure you want to submit?', ui.ButtonSet.YES_NO);
        // Process the user's response.
        try {
            if (response == ui.Button.YES) {
                // User clicked "Yes".
                Logger.log("Submit to MedDict DB");
            } else {
                // User clicked "No" or X in the title bar.
                Logger.log("Cancel");
                return;
            }
        }
        catch (err) {
            Logger.log(err);
        
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