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
            // illustration: row[7]
        };
        data.push(entry);
    }
    // const json = JSON.stringify(data);

    // clear cache
    const cache_last_row = cache_sheet.getLastRow();
    const cache_range = cache_sheet.getRange(5, 1, cache_last_row - 3, 8);
    cache_range.clearContent();
    Logger.log("Cleared");
    return data;
}