import {MAX_DESCRIPTION_LENGTH} from "../const/const";
import {AppRoutes} from "../types/route";

export function validateAndTrimText(str: string, path: string) {
    if(path === AppRoutes.Main && str.length > MAX_DESCRIPTION_LENGTH) {
       return str.slice(0, MAX_DESCRIPTION_LENGTH) + "...";
    }
    return str;
}
