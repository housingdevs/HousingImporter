/// <reference types="../CTAutocomplete" />
import { loadAction } from "./importer/loadAction.js";
import settings from "./gui/settings.js";

export default (script, config) => {
    if (!config.timeout || !config.useSafeMode) return false;
    settings.timeout = config.timeout;
    settings.useSafeMode = config.useSafeMode;
    loadAction(script);
}