import menus from '../actions/menus';
import { addOperation, setConfig, isWorking } from '../gui/Queue';
import conditions from '../actions/conditions';

export function loadAction(script, config, callback) {
    if (isWorking()) return callback(false);
    setConfig(config, callback);
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
                    addOperation({ type: 'option', option: script[container].contextTarget.name.startsWith("/") ? script[container].contextTarget.name : "/" + script[container].contextTarget.name });
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
                addOperation({ type: 'option', option: menu[key].options.find(n => n.toLowerCase() == component[key].replace("_", "").toLowerCase()) });
                break;
            case "dynamic_option_select":
                addOperation({ type: 'option', option: component[key] });
                break;
            case "location":
                addOperation({ type: 'click', slot: 13 }); // Click "Custom Coordinates" Button
                let location = component[key];
                addOperation({ type: 'anvil', text: `${location.relX == 0 ? "" : "~"}${location.x} ${location.relY == 0 ? "" : "~"}${location.y} ${location.relZ == 0 ? "" : "~"}${location.z} ${location.yaw == -999 ? "" : location.yaw} ${location.yaw == 0 || location.pitch == 0 ? "" : location.pitch}` });
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
                if (component[key] < 50) addOperation({ type: 'click', slot: component[key] + 10 })
                else {
                    addOperation({ type: 'click', slot: 53 }); // click next page
                    addOperation({ type: 'click', slot: component[key] - 40 });
                }
                break;
            case "sound":
                addOperation({ type: 'click', slot: 48 }); // click "Custom Sound" Button
                addOperation({ type: 'chat', text: convertSound(component[key]) });
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




const sounds = [
    { name: "Ambience Cave", path: "ambient.cave.cave" },
    { name: "Ambience Rain", path: "ambient.weather.rain" },
    { name: "Ambience Thunder", path: "ambient.weather.thunder" },
    { name: "Anvil Break", path: "random.anvil_break" },
    { name: "Anvil Land", path: "random.anvil_land" },
    { name: "Anvil Use", path: "random.anvil_use" },
    { name: "Arrow Hit", path: "random.bowhit" },
    { name: "Burp", path: "random.burp" },
    { name: "Chest Close", path: "random.chestclosed" },
    { name: "Chest Open", path: "random.chestopen" },
    { name: "Click", path: "random.click" },
    { name: "Door Close", path: "random.door_close" },
    { name: "Door Open", path: "random.door_open" },
    { name: "Drink", path: "random.drink" },
    { name: "Eat", path: "random.eat" },
    { name: "Explode", path: "random.explode" },
    { name: "Fall Big", path: "game.player.hurt.fall.big" },
    { name: "Fall Small", path: "game.player.hurt.fall.small" },
    { name: "Fizz", path: "random.fizz" },
    { name: "Fuse", path: "game.tnt.primed" },
    { name: "Glass", path: "dig.glass" },
    { name: "Hurt Flesh", path: "game.player.hurt" },
    { name: "Item Break", path: "random.break" },
    { name: "Item Pickup", path: "random.pop" },
    { name: "Lava Pop", path: "liquid.lavapop" },
    { name: "Level Up", path: "random.levelup" },
    { name: "Note Bass", path: "note.bass" },
    { name: "Note Piano", path: "note.harp" },
    { name: "Note Bass Drum", path: "note.bd" },
    { name: "Note Sticks", path: "note.hat" },
    { name: "Note Bass Guitar", path: "note.bassattack" },
    { name: "Note Snare Drum", path: "note.snare" },

    { name: "Note Pling", path: "note.pling" },

    { name: "Orb Pickup", path: "random.orb" },
    { name: "Shoot Arrow", path: "random.bow" },
    { name: "Splash", path: "game.player.swim.splash" },
    { name: "Swim", path: "game.player.swim" },
    { name: "Wood Click", path: "random.wood_click" },

    { name: "Bat Death", path: "mob.bat.death" },
    { name: "Bat Hurt", path: "mob.bat.hurt" },
    { name: "Bat Idle", path: "mob.bat.idle" },
    { name: "Bat Loop", path: "mob.bat.loop" },
    { name: "Bat Takeoff", path: "mob.bat.takeoff" },
    { name: "Blaze Breath", path: "mob.blaze.breathe" },
    { name: "Blaze Death", path: "mob.blaze.death" },
    { name: "Blaze Hit", path: "mob.blaze.hit" },
    { name: "Cat Hiss", path: "mob.cat.hiss" },
    { name: "Cat Hit", path: "mob.cat.hitt" },
    { name: "Cat Meow", path: "mob.cat.meow" },
    { name: "Cat Purr", path: "mob.cat.purr" },
    { name: "Cat Purreow", path: "mob.cat.purreow" },
    { name: "Chicken Idle", path: "mob.chicken.say" },
    { name: "Chicken Hurt", path: "mob.chicken.hurt" },
    { name: "Chicken Egg Pop", path: "mob.chicken.plop" },
    { name: "Chicken Walk", path: "mob.chicken.step" },
    { name: "Cow Idle", path: "mob.cow.say" },
    { name: "Cow Hurt", path: "mob.cow.hurt" },
    { name: "Cow Walk", path: "mob.cow.step" },
    { name: "Creeper Hiss", path: "mob.creeper.say" },
    { name: "Creeper Death", path: "mob.creeper.death" },
    { name: "Enderdragon Death", path: "mob.enderdragon.end" },
    { name: "Enderdragon Growl", path: "mob.enderdragon.growl" },
    { name: "Enderdragon Hit", path: "mob.enderdragon.hit" },
    { name: "Enderdragon Wings", path: "mob.enderdragon.wings" },
    { name: "Enderman Death", path: "mob.endermen.death" },
    { name: "Enderman Hit", path: "mob.endermen.hit" },
    { name: "Enderman Idle", path: "mob.endermen.idle" },
    { name: "Enderman Teleport", path: "mob.endermen.portal" },
    { name: "Enderman Scream", path: "mob.endermen.scream" },
    { name: "Enderman Stare", path: "mob.endermen.stare" },

    { name: "Ghast Scream", path: "mob.ghast.scream" },
    { name: "Ghast Scream2", path: "mob.ghast.affectionate_scream" },
    { name: "Ghast Charge", path: "mob.ghast.charge" },
    { name: "Ghast Death", path: "mob.ghast.death" },
    { name: "Ghast Fireball", path: "mob.ghast.fireball" },
    { name: "Ghast Moan", path: "mob.ghast.moan" },

    { name: "Guardian Hit", path: "mob.guardian.hit" },
    { name: "Guardian Idle", path: "mob.guardian.idle" },
    { name: "Guardian Death", path: "mob.guardian.death" },
    { name: "Guardian Elder Hit", path: "mob.guardian.elder.hit" },
    { name: "Guardian Elder Idle", path: "mob.guardian.elder.idle" },
    { name: "Guardian Elder Death", path: "mob.guardian.elder.death" },
    { name: "Guardian Land Hit", path: "mob.guardian.land.hit" },
    { name: "Guardian Land Idle", path: "mob.guardian.land.idle" },
    { name: "Guardian Land Death", path: "mob.guardian.land.death" },
    { name: "Guardian Curse", path: "mob.guardian.curse" },
    { name: "Guardian Attack", path: "mob.guardian.attack" },
    { name: "Guardian Flop", path: "mob.guardian.flop" },

    { name: "Irongolem Death", path: "mob.irongolem.death" },
    { name: "Irongolem Hit", path: "mob.irongolem.hit" },
    { name: "Irongolem Throw", path: "mob.irongolem.throw" },
    { name: "Irongolem Walk", path: "mob.irongolem.walk" },

    { name: "Magmacube Walk", path: "mob.magmacube.small" },
    { name: "Magmacube Walk2", path: "mob.magmacube.big" },
    { name: "Magmacube Jump", path: "mob.magmacube.jump" },

    { name: "Pig Idle", path: "mob.pig.say" },
    { name: "Pig Death", path: "mob.pig.death" },
    { name: "Pig Walk", path: "mob.pig.step" },

    { name: "Rabbit Ambient", path: "mob.rabbit.idle" },
    { name: "Rabbit Death", path: "mob.rabbit.death" },
    { name: "Rabbit Hurt", path: "mob.rabbit.hurt" },
    { name: "Rabbit Jump", path: "mob.rabbit.hop" },

    { name: "Sheep Idle", path: "mob.sheep.say" },
    { name: "Sheep Shear", path: "mob.sheep.shear" },
    { name: "Sheep Walk", path: "mob.sheep.step" },

    { name: "Silverfish Hit", path: "mob.silverfish.hit" },
    { name: "Silverfish Kill", path: "mob.silverfish.kill" },
    { name: "Silverfish Idle", path: "mob.silverfish.say" },
    { name: "Silverfish Walk", path: "mob.silverfish.step" },

    { name: "Skeleton Idle", path: "mob.skeleton.say" },
    { name: "Skeleton Death", path: "mob.skeleton.death" },
    { name: "Skeleton Hurt", path: "mob.skeleton.hurt" },
    { name: "Skeleton Walk", path: "mob.skeleton.step" },

    { name: "Slime Attack", path: "mob.slime.attack" },
    { name: "Slime Walk", path: "mob.slime.small" },
    { name: "Slime Walk2", path: "mob.slime.big" },

    { name: "Spider Idle", path: "mob.spider.say" },
    { name: "Spider Death", path: "mob.spider.death" },
    { name: "Spider Walk", path: "mob.spider.step" },

    { name: "Wither Death", path: "mob.wither.death" },
    { name: "Wither Hurt", path: "mob.wither.hurt" },
    { name: "Wither Idle", path: "mob.wither.idle" },
    { name: "Wither Shoot", path: "mob.wither.shoot" },
    { name: "Wither Spawn", path: "mob.wither.spawn" },

    { name: "Wolf Bark", path: "mob.wolf.bark" },
    { name: "Wolf Death", path: "mob.wolf.death" },
    { name: "Wolf Growl", path: "mob.wolf.growl" },
    { name: "Wolf Howl", path: "mob.wolf.howl" },
    { name: "Wolf Hurt", path: "mob.wolf.hurt" },
    { name: "Wolf Pant", path: "mob.wolf.panting" },
    { name: "Wolf Shake", path: "mob.wolf.shake" },
    { name: "Wolf Walk", path: "mob.wolf.step" },
    { name: "Wolf Whine", path: "mob.wolf.whine" },

    { name: "Zombie Metal", path: "mob.zombie.metal" },
    { name: "Zombie Wood", path: "mob.zombie.wood" },
    { name: "Zombie Woodbreak", path: "mob.zombie.woodbreak" },
    { name: "Zombie Idle", path: "mob.zombie.say" },
    { name: "Zombie Death", path: "mob.zombie.death" },
    { name: "Zombie Hurt", path: "mob.zombie.hurt" },
    { name: "Zombie Infect", path: "mob.zombie.infect" },
    { name: "Zombie Unfect", path: "mob.zombie.unfect" },
    { name: "Zombie Remedy", path: "mob.zombie.remedy" },
    { name: "Zombie Walk", path: "mob.zombie.step" },
    { name: "Zombie Pig Idle", path: "mob.zombiepig.zpig" },
    { name: "Zombie Pig Angry", path: "mob.zombiepig.zpigangry" },
    { name: "Zombie Pig Death", path: "mob.zombiepig.zpigdeath" },
    { name: "Zombie Pig Hurt", path: "mob.zombiepig.zpighurt" },

    { name: "Firework Blast", path: "fireworks.blast" },
    { name: "Firework Blast2", path: "fireworks.blast_far" },
    { name: "Firework Large Blast", path: "fireworks.largeBlast" },
    { name: "Firework Large Blast2", path: "fireworks.largeBlast_far" },
    { name: "Firework Twinkle", path: "fireworks.twinkle" },
    { name: "Firework Twinkle2", path: "fireworks.twinkle_far" },
    { name: "Firework Launch", path: "fireworks.launch" },

    { name: "Fireworks Blast", path: "fireworks.blast" },
    { name: "Fireworks Blast2", path: "fireworks.blast_far" },
    { name: "Fireworks Large Blast", path: "fireworks.largeBlast" },
    { name: "Fireworks Large Blast2", path: "fireworks.largeBlast_far" },
    { name: "Fireworks Twinkle", path: "fireworks.twinkle" },
    { name: "Fireworks Twinkle2", path: "fireworks.twinkle_far" },
    { name: "Fireworks Launch", path: "fireworks.launch" },

    { name: "Successful Hit", path: "random.successful_hit" },

    { name: "Horse Angry", path: "mob.horse.angry" },
    { name: "Horse Armor", path: "mob.horse.armor" },
    { name: "Horse Breathe", path: "mob.horse.breathe" },
    { name: "Horse Death", path: "mob.horse.death" },
    { name: "Horse Gallop", path: "mob.horse.gallop" },
    { name: "Horse Hit", path: "mob.horse.hit" },
    { name: "Horse Idle", path: "mob.horse.idle" },
    { name: "Horse Jump", path: "mob.horse.jump" },
    { name: "Horse Land", path: "mob.horse.land" },
    { name: "Horse Saddle", path: "mob.horse.leather" },
    { name: "Horse Soft", path: "mob.horse.soft" },
    { name: "Horse Wood", path: "mob.horse.wood" },
    { name: "Donkey Angry", path: "mob.horse.donkey.angry" },
    { name: "Donkey Death", path: "mob.horse.donkey.death" },
    { name: "Donkey Hit", path: "mob.horse.donkey.hit" },
    { name: "Donkey Idle", path: "mob.horse.donkey.idle" },
    { name: "Horse Skeleton Death", path: "mob.horse.skeleton.death" },
    { name: "Horse Skeleton Hit", path: "mob.horse.skeleton.hit" },
    { name: "Horse Skeleton Idle", path: "mob.horse.skeleton.idle" },
    { name: "Horse Zombie Death", path: "mob.horse.zombie.death" },
    { name: "Horse Zombie Hit", path: "mob.horse.zombie.hit" },
    { name: "Horse Zombie Idle", path: "mob.horse.zombie.idle" },

    { name: "Villager Death", path: "mob.villager.death" },
    { name: "Villager Haggle", path: "mob.villager.haggle" },
    { name: "Villager Hit", path: "mob.villager.hit" },
    { name: "Villager Idle", path: "mob.villager.idle" },
    { name: "Villager No", path: "mob.villager.no" },
    { name: "Villager Yes", path: "mob.villager.yes" },
];

function convertSound(sound) {
    let path = sounds.find(e => e.name.replace(" ", "_").toUpperCase() == sound);
    if (path) return path.path;
    return sound;
}