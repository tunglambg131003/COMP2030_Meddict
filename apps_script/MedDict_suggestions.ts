
function pullSuggestions() {
    let headers = {
        "Authorization": "Bearer " + API_KEY,
    };
    let params = {
        method: 'get',
        headers: headers,
        followRedirects: true
    } 
    // format: [{"suggestion": str, "lang": en/vn}, ...]
    let response = UrlFetchApp.fetch("https://api.meddict-vinuni.com/words/suggestions", params);
    let data = JSON.parse(response.getContentText());
    Logger.log(data);
    if (data.length == 0) {
        // notify user that there is no suggestion
        const ui = SpreadsheetApp.getUi();
        ui.alert("There is no suggestion yet! Enjoy your day :)")
        return;
    }
    const suggestion_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Suggestion");
    const last_row = suggestion_sheet.getLastRow();
    const range = suggestion_sheet.getRange(5, 1, last_row - 3, 3);
    // write to sheet
    for (var i = 0; i < data.length; i++) {
        const row = data[i];
        const suggestion = row["suggestion"];
        const lang = row["lang"];
        const new_row = [suggestion, lang, ""];
        // add new row
        suggestion_sheet.appendRow(new_row);
        // add checkbox in the last col
        const last_row = suggestion_sheet.getLastRow();
        const cell = suggestion_sheet.getRange(last_row, 3);
        cell.insertCheckboxes();
    }
}

function handle_suggestion(e){
    // handle edits in the suggestion sheet
    const sheet = e.source;
    // ignore edits if not in the column 3
    if (e.range.columnEnd != 3) {
        return;
    }
    // get the row
    const row = e.range.rowEnd;
    const suggestion_sheet = sheet.getSheetByName("Suggestion");
    // check if the checkbox is checked
    const checkbox = suggestion_sheet.getRange(row, 3);
    // check if value == TRUE, if yes, delete the row
    if (checkbox.isChecked()){
        // delete the row
        suggestion_sheet.deleteRow(row);
    }
}