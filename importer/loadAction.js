import menus from '../actions/_import_all';
import { addOperation } from '../gui/Queue';
import convertSound from '../utils/convertSound'
const conditions = menus.conditions;

export default (/*actions*/) => {
    // temp variable for testing
    let actions = JSON.parse(FileLib.read('HousingImporter', "/importer/test.json"));
    for (let i = 0; i < actions.length; i++) {
        addOperation(['click', { slot: 50 }]); // click "Add Action" Button
        addOperation(['option', { option: menus[actions[i].type].action_name }]);
        importComponent(actions[i], menus[actions[i].type]);
        addOperation(['returnToEditActions']);
    }
    addOperation(['done']);
}

function importComponent(component, menu) {
    // Go through every setting in the menu
    addOperation(['setGuiContext', { context: component.type }]);
    for (let key in component) {
        if (key == "type") continue;
        if (JSON.stringify(menu[key].default_value) == JSON.stringify(component[key])) continue;
        if (!component[key]) continue;
        let setting = menu[key];
        addOperation(['click', { slot: setting.slot }]);
        switch (setting.type) {
            case "chat_input":
                addOperation(['chat', { text: component[key] }]);
                break;
            case "anvil_input":
                addOperation(['anvil', { text: component[key] }]);
                break;
            case "conditions":
                for (let condition in component[key]) {
                    addOperation(['click', { slot: 50 }]); // click "Add Condition" Button
                    addOperation(['option', { option: conditions[component[key][condition].type].condition_name }]);
                    importComponent(component[key][condition], conditions[component[key][condition].type]);
                    addOperation(['returnToEditActions']);
                }
                addOperation(['back']);
                break;
            case "static_option_select":
                // Static option select is for Hypixel made options, which will be uppercase for the first character
                addOperation(['option', { option: properCapitalize(component[key]) }]);
                break;
            case "dynamic_option_select":
                addOperation(['option', { option: component[key] }]);
                break;
            case "location":
                addOperation(['click', { slot: 13 }]); // Click "Custom Coordinates" Button
                let location = component[key];
                addOperation(['anvil', { text: `${location.relX == 0? "" : "~"}${location.x} ${location.relY == 0? "" : "~"}${location.y} ${location.relZ == 0? "" : "~"}${location.z} ${location.yaw == -999? "" : location.yaw} ${location.yaw == 0 || location.pitch == 0? "" : location.pitch}` }]);
                break;
            case "subactions":
                for (let subaction in component[key]) {
                    addOperation(['click', { slot: 50 }]); // click "Add Action" Button
                    addOperation(['option', { option: menus[component[key][subaction].type].action_name }]);
                    importComponent(component[key][subaction], menus[component[key][subaction].type]);
                    addOperation(['returnToEditActions']);
                }
                addOperation(['back']);
                break;
            case "item":
                addOperation(['item', { item: component[key] }]);
                break;
            // Action exceptions that cannot fit under other options
            case "sound":
                addOperation(['click', { slot: 48 }]); // click "Custom Sound" Button
                addOperation(['chat', { text: convertSound(component[key])}]);
                break;
            case "slot":
                if (/(\%.*\%)|(\d+)/.test(component[key])) {
                    addOperation(['click', { slot: 8 }]); // click "Manual Input" Button
                    addOperation(['anvil', { text: component[key] }]);
                } else {
                    addOperation(['option', { option: component[key] }]);
                }
                break;
        }
    }

}

function properCapitalize(str) {
    return str.replace(/\b\w/g, function(char) {
        return char.toUpperCase();
    });
}