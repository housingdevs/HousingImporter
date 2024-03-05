/// <reference types="../CTAutocomplete" />
import { loadAction } from "./importer/loadAction.js";

export default (script, config, callback) => {
    if (!config.timeout || !Object.keys(config).includes("useSafeMode")) {
        callback(false);
        return;
    }
    loadAction(script, config, callback);
}