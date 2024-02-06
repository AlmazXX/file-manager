import { extractCommand } from "../utils/helpers.js";

class Commander {
  constructor() {
    this.commands = new Map();
  }

  addCommand(command, handler) {
    this.commands.set(command, handler);
  }

  async handleCommand(input) {
    const { command, source, destination } = extractCommand(input);
    const handler = this.commands.get(command);

    await handler(source, destination);
  }
}

export default Commander;
