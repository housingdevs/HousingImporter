import menus from '../actions/_import_all';
import { addOperation } from '../gui/Queue';
import convertSound from '../utils/convertSound'
const conditions = menus.conditions;

export default (/*script*/) => {
    // temp variable for testing
    let script = JSON.parse(FileLib.read('HousingImporter', "/importer/test.json"));
    for (let container in script) {
        if (script[container].context != "DEFAULT") {
            addOperation({ type: 'returnToEditActions' });
            addOperation({ type: 'closeGui' });
            switch (script[container].context) {
                case "FUNCTION":
                    addOperation({ type: 'chat', text: `/function edit ${script[container].contextTarget.name}`, func: script[container].contextTarget.name, command: true });
                    break;
                case "EVENT":
                    addOperation({ type: 'chat', text: `/eventactions`, command: true });
                    addOperation({ type: 'option', option: script[container].contextTarget.name });
                    break;
                case "COMMAND":
                    addOperation({ type: 'chat', text: `/customcommands`, command: true });
                    addOperation({ type: 'option', option: script[container].contextTarget.name.startsWith("/")? script[container].contextTarget.name : "/" + script[container].contextTarget.name });
                    break;
                case "NPC":
                    addOperation({ type: 'goto', name: script[container].contextTarget.name });
                    addOperation({ type: 'click', slot: 12 });
                    break;
                case "BUTTON":
                    addOperation({ type: 'goto', name: script[container].contextTarget.name });
                    break;
                case "PAD":
                    addOperation({ type: 'goto', name: script[container].contextTarget.name });
                    break;
            }
        }
        for (let i = 0; i < script[container].actions.length; i++) {
            addOperation({ type: 'click', slot: 50 }); // click "Add Action" Button
            addOperation({ type: 'option', option: menus[script[container].actions[i].type].action_name });
            importComponent(script[container].actions[i], menus[script[container].actions[i].type]);
            addOperation({ type: 'returnToEditActions' });
        }
    }
    addOperation({ type: 'done' });
}

function importComponent(component, menu) {
    // Go through every setting in the menu
    addOperation({ type: 'setGuiContext', context: component.type });
    for (let key in component) {
        if (key == "type") continue;
        if (JSON.stringify(menu[key].default_value) == JSON.stringify(component[key])) continue;
        if (!component[key]) continue;
        let setting = menu[key];
        addOperation({ type: 'click', slot: setting.slot });
        switch (setting.type) {
            case "chat_input":
                addOperation({ type: 'chat', text: component[key] });
                break;
            case "anvil_input":
                addOperation({ type: 'anvil', text: component[key] });
                break;
            case "conditions":
                for (let condition in component[key]) {
                    addOperation({ type: 'click', slot: 50 }); // click "Add Condition" Button
                    addOperation({ type: 'option', option: conditions[component[key][condition].type].condition_name });
                    importComponent(component[key][condition], conditions[component[key][condition].type]);
                    addOperation({ type: 'returnToEditActions' });
                }
                addOperation({ type: 'back' });
                break;
            case "static_option_select":
                // Static option select is for Hypixel made options, which will be uppercase for the first character
                addOperation({ type: 'option', option: properCapitalize(component[key]) });
                break;
            case "dynamic_option_select":
                addOperation({ type: 'option', option: component[key] });
                break;
            case "location":
                addOperation({ type: 'click', slot: 13 }); // Click "Custom Coordinates" Button
                let location = component[key];
                addOperation({ type: 'anvil', text: `${location.relX == 0? "" : "~"}${location.x} ${location.relY == 0? "" : "~"}${location.y} ${location.relZ == 0? "" : "~"}${location.z} ${location.yaw == -999? "" : location.yaw} ${location.yaw == 0 || location.pitch == 0? "" : location.pitch}` });
                break;
            case "subactions":
                for (let subaction in component[key]) {
                    addOperation({ type: 'click', slot: 50 }); // click "Add Action" Button
                    addOperation({ type: 'option', option: menus[component[key][subaction].type].action_name });
                    importComponent(component[key][subaction], menus[component[key][subaction].type]);
                    addOperation({ type: 'returnToEditActions' });
                }
                addOperation({ type: 'back' });
                break;
            case "item":
                addOperation({ type: 'item', item: component[key] });
                break;
            // Action exceptions that cannot fit under other options
            case "enchantment":
                if (component[key] < 50) addOperation({ type: 'click', slot: component[key] + 10})
                else {
                    addOperation({ type: 'click', slot: 53 }); // click next page
                    addOperation({ type: 'click', slot: component[key] - 40});
                }
                break;
            case "sound":
                addOperation({ type: 'click', slot: 48 }); // click "Custom Sound" Button
                addOperation({ type: 'chat', text: convertSound(component[key])});
                break;
            case "slot":
                if (/(\%.*\%)|(\d+)/.test(component[key])) {
                    addOperation({ type: 'click', slot: 8 }); // click "Manual Input" Button
                    addOperation({ type: 'anvil', text: component[key] });
                } else {
                    addOperation({ type: 'option', option: component[key] });
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