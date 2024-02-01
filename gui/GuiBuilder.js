const GuiButton = net.minecraft.client.gui.GuiButton;

export class Button {
	constructor(x, y, width, height, text) {
		this.mcObject = new GuiButton(0, x, y, width, height, text);
		this.getX = () => { return this.mcObject.field_146128_h }
		this.getY = () => { return this.mcObject.field_146129_i }
		this.getWidth = () => { return this.mcObject.field_146120_f }
		this.getHeight = () => { return this.mcObject.field_146121_g }
		this.setX = (x) => { this.mcObject.field_146128_h = x }
		this.setY = (y) => { this.mcObject.field_146129_i = y }
		this.setWidth = (width) => { this.mcObject.field_146120_f = width }
		this.setHeight = (height) => { this.mcObject.field_146121_g = height }
		this.setEnabled = (enabled) => {
			const isEnabledField = this.mcObject.class.getDeclaredField('field_146124_l');
			isEnabledField.setAccessible(true);
			isEnabledField.set(this.mcObject, enabled);
		}
		this.getEnabled = () => {
			const isEnabledField = this.mcObject.class.getDeclaredField('field_146124_l');
			isEnabledField.setAccessible(true);
			return isEnabledField.get(this.mcObject);
		}
		this.setText = (text) => {
			const textField = this.mcObject.class.getDeclaredField('field_146126_j');
			textField.setAccessible(true);
			textField.set(this.mcObject, text);
		}
		this.getText = () => {
			const textField = this.mcObject.class.getDeclaredField('field_146126_j');
			textField.setAccessible(true);
			return textField.get(this.mcObject);
		}
		this.render = (x, y) => {
			this.mcObject.func_146112_a(Client.getMinecraft(), x, y);
		}

	}
}
