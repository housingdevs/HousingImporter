// config.js
import { @Vigilant @SliderProperty @SwitchProperty @NumberProperty @TextProperty @ButtonProperty @SliderProperty @CheckboxProperty } from 'Vigilance';

@Vigilant("Importer", `Importer`, {
	getCategoryComparator: () => (a, b) => {
		const categories = ["General", "Actions / Items",  "Miscellaneous"];

		return categories.indexOf(a.name) - categories.indexOf(b.name);
	},
})
class Settings {

	// Actions / Items 

	@SwitchProperty({
		name: "Safe Mode",
		description: 'Will show you where to click while loading in an action, this requires manual input and is no longer considered a "macro".\n\n&aSafeMode is recommended if you want to be extra careful not to break the rules.',
		category: "Actions / Items",
		subcategory: "Actions / Items",
	})
	useSafeMode = false;

	@SwitchProperty({
		name: "Close GUI on Exit",
		description: 'Closes the GUI when it finishes an import or exits due to error/cancelation',
		category: "Actions / Items",
		subcategory: "Actions / Items",
	})
	closeGUI = true;

	@SwitchProperty({
		name: "Play Sound on Exit",
		description: 'Play a sound when the import finishes',
		category: "Actions / Items",
		subcategory: "Actions / Items",
	})
	playSoundOnFinish = true;
	
	// MISCELLANEOUS

	@SliderProperty({
		name: "GUI Timeout",
		description: "Amount of ticks after not clicking anything in the GUI before declaring an error and timing out.\n\n&eIf you have lots of lagspikes / slow internet and Importer keeps timing out you should increase this.",
		category: "Miscellaneous",
		subcategory: "Miscellaneous",
		min: 60,
		max: 200
	})
	guiTimeout = 60;


	
	constructor() {
		this.initialize(this);
	}
}

export default new Settings();
