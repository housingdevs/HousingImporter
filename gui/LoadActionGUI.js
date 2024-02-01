import { Button } from './GuiBuilder';
import loadAction from '../importer/loadAction';

const button = new Button(0, 0, 0, 20, 'Help me');

register('guiRender', (x, y) => {
	if (!Player.getContainer()) return;
	if (!isInActionGui()) return;

	const guiTopField = net.minecraft.client.gui.inventory.GuiContainer.class.getDeclaredField('field_147009_r');
	const xSizeField = net.minecraft.client.gui.inventory.GuiContainer.class.getDeclaredField('field_146999_f');
	guiTopField.setAccessible(true);
	xSizeField.setAccessible(true);
	var chestGuiTop = guiTopField.get(Client.currentGui.get());
	var chestWidth = xSizeField.get(Client.currentGui.get());

	button.setWidth(chestWidth);
	button.setX(Renderer.screen.getWidth() / 2 - chestWidth / 2);
	button.setY(chestGuiTop - button.getHeight() - 59);
	button.render(x, y);
});

register('guiMouseClick', (x, y, mouseButton) => {
	if (!Player.getContainer()) return;
	if (!isInActionGui()) return;

	if (x > button.getX() && x < button.getX() + button.getWidth() && y > button.getY() && y < button.getY() + button.getHeight()) {
		World.playSound('random.click', 1, 1);
		loadAction();
	}
})

register('guiClosed', (gui) => {
	if (gui.class.getName() !== 'net.minecraft.client.gui.inventory.GuiChest') return;

	const lowerChestField = gui.class.getDeclaredField('field_147015_w');
	lowerChestField.setAccessible(true);
	const lowerChest = lowerChestField.get(gui);

	const inventoryTitleField = net.minecraft.inventory.InventoryBasic.class.getDeclaredField('field_70483_a');
	inventoryTitleField.setAccessible(true);
	const inventoryTitle = inventoryTitleField.get(lowerChest);

	if (inventoryTitle !== 'Edit Actions') return;
})

function isInActionGui() {
	const containerName = Player.getContainer().getName();
	if (Client.currentGui.getClassName() === "GuiEditSign") return
	if (Player.getContainer().getClassName() !== 'ContainerChest') return false;
	if (containerName === 'Edit Menu' || containerName === "Edit Elements") return false;
	if (containerName.match(/Edit |Actions: /)) return true;
	return false;
}
