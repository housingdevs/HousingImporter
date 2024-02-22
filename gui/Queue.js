import Navigator from "./Navigator";
import Settings from "./settings";

const GuiButton = net.minecraft.client.gui.GuiButton;
class Button {
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

let queue = [];
let fails = [];
let timeWithoutOperation = 0;
let operationTimes = { started: 0, total: 0 };
let currentGuiContext = null;

register("tick", () => {
  if (queue.length > 0) timeWithoutOperation++;
  if (
    (timeWithoutOperation > Settings.timeout) & (queue.length > 0) &&
    !Settings.useSafeMode && !Navigator.goto
  ) {
    fails.push(`&cOperation timed out. &f(too long without GUI click)`);
    doneLoading();
  }
  if (!Navigator.isReady) return;
  if (queue.length === 0) return;
  timeWithoutOperation = 0;
  if (Navigator.isReturning) return Navigator.returnToEditActions();
  if (Navigator.isSelecting) {
    const attemptResult = Navigator.selectOption(Navigator.optionBeingSelected);
    if (attemptResult === false)
      fails.push(
        `&cCouldn't find option &f${Navigator.optionBeingSelected} &cin &f${currentGuiContext}&c.`
      );
    return;
  }

  if (operationTimes.started === 0) operationTimes.started = Date.now();
  operationTimes.total++;
  if (Navigator.goto) operationTimes.started += 0.05;
  timeRemainingButton.setText(
    `Time Remaining: ${Math.round(
      (((Date.now() - operationTimes.started) / operationTimes.total) *
        queue.length) /
      1000
    )} seconds`
  );

  let operation = queue.shift();
  if (operation.type === "setGuiContext") {
    currentGuiContext = operation.context; // for error messages
    if (queue.length === 0) return;
    operation = queue.shift();
  }
  Navigator.goto = false;
  switch (operation.type) {
    case "click":
      return Navigator.click(operation.slot);
    case "anvil":
      return Navigator.inputAnvil(operation.text);
    case "returnToEditActions":
      return Navigator.returnToEditActions();
    case "back":
      return Navigator.goBack();
    case "option":
      return Navigator.setSelecting(operation.option);
    case "chat":
      return Navigator.inputChat(operation.text, operation.func, operation.command);
    case "item":
      return Navigator.selectItem(operation.item);
    case "closeGui":
      return Client.currentGui.close();
    case "goto":
      Navigator.goto = true;
      ChatLib.chat(`&3HousingImporter &fPlease open action container &e${operation.name}`);
      Navigator.isReady = false;
      return;
    case "wait":
      Navigator.isReady = false;
      return setTimeout(() => {
        Navigator.isReady = true;
      }, operation.time);
    case "done":
      return doneLoading();
  }
});

function doneLoading() {
  timeWithoutOperation = 0;
  Navigator.isWorking = false;
  queue = [];
  operationTimes = { started: 0, total: 0 };
  if (fails.length > 0) {

  } else {
    // done
  }
}

const timeRemainingButton = new Button(0, 0, 0, 20, "Time Remaining:");
const cancelButton = new Button(0, 100, 100, 20, "Cancel");

register("guiRender", (x, y) => {
  if (!Player.getContainer()) return;
  if (queue.length === 0) return;

  timeRemainingButton.setWidth(200);
  timeRemainingButton.setX(
    Renderer.screen.getWidth() / 2 - timeRemainingButton.getWidth() / 2
  );
  cancelButton.setX(
    Renderer.screen.getWidth() / 2 - (timeRemainingButton.getWidth() - 100) / 2
  );
  timeRemainingButton.setY(timeRemainingButton.getHeight() * 3);
  cancelButton.setY(timeRemainingButton.getHeight() * 3 + 20);
  timeRemainingButton.render(x, y);
  cancelButton.render(x, y);
});

register("guiMouseClick", (x, y) => {
  if (!Player.getContainer()) return;

  if (
    x > cancelButton.getX() &&
    x < cancelButton.getX() + cancelButton.getWidth() &&
    y > cancelButton.getY() &&
    y < cancelButton.getY() + cancelButton.getHeight()
  ) {
    fails.push(`&6Cancelled by user.`);
    queue.splice(0, queue.length - 1);
  }
});

export function addOperation(operation) {
  Navigator.isWorking = true;
  queue.push(operation);
}
