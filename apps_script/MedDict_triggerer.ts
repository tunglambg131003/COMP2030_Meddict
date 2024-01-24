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
    const scriptLock = LockService.getScriptLock();
    scriptLock.tryLock(5000);
    if (!scriptLock.hasLock()) {
        return;
    }
    try {
        update_cache(state, e);
    } catch (error) {
        return "Error: " + error;
    }
    finally {
        scriptLock.releaseLock();
    }
}


function authorize(){
    Logger.log("Authorize")
}