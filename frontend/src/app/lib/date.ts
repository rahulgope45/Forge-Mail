export function toUtcIsoOrThrow(localDateTimeStr: string):string {
    const date = new Date(localDateTimeStr);
    if(isNaN(date.getTime())){
        throw new Error("Invalid scheduled date/time.");
    }
    if(date.getTime() <= Date.now()){
        throw new Error("Scheduled time must be in the future.");
    }

    return date.toISOString();
}