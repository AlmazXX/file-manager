import { createInterface } from "node:readline/promises";
import { homedir } from "os";
import Commander from "../commander/commander.js";
import FileSystem from "../fs/fs.js";
import { Hash } from "../hash/hash.js";
import { NavigationManager } from "../nwd/nwd.js";
import { opearatingSystem } from "../os/os.js";
import { ZipManager } from "../zip/zip.js";

class FileManager extends Commander {
  constructor() {
    super();
    this.username = this.getUsername();
    this.rl = createInterface({ input: process.stdin, output: process.stdout });
  }

  start() {
    console.clear();
    console.log("Welcome to the File Manager, %s!", this.username);
    process.chdir(homedir());
    console.log("You are currently in %s", process.cwd());

    this.rl
      .on("line", async (line) => {
        this.handleCommand(line)
          .catch(() => console.error("Invalid input"))
          .finally(() => {
            console.log(`You are currently in ${process.cwd()}`);
          });
      })
      .on("close", () => {
        this.exit();
      });
  }

  getUsername() {
    const args = process.argv.splice(2);
    const firstArg = args[0];

    if (!firstArg) return "Anonymous";

    return firstArg.includes("=") && firstArg.startsWith("--username")
      ? firstArg.split("=")[1]
      : args[1];
  }

  exit() {
    console.log(
      "Thank you for using File Manager, %s, goodbye!",
      this.username
    );
    process.exit();
  }
}

const fileManager = new FileManager();
const fs = new FileSystem();
const nm = new NavigationManager();
const hash = new Hash();
const zip = new ZipManager();

fileManager.addCommand(".exit", () => {
  fileManager.exit();
});

fileManager.addCommand("cat", (source) => {
  fs.read(source);
});

fileManager.addCommand("add", (source) => {
  fs.create(source);
});

fileManager.addCommand("rn", (source, destination) => {
  fs.rename(source, destination);
});

fileManager.addCommand("cp", async (source, destination) => {
  await fs.copy(source, destination);
});

fileManager.addCommand("mv", async (source, destination) => {
  await fs.move(source, destination);
});

fileManager.addCommand("rm", (source) => {
  fs.remove(source);
});

fileManager.addCommand("os", (flag) => {
  opearatingSystem.handleCommand(flag);
});

fileManager.addCommand("up", nm.up);

fileManager.addCommand("ls", nm.ls);

fileManager.addCommand("cd", (path) => {
  nm.cd(path);
});

fileManager.addCommand("hash", (source) => {
  hash.encode(source);
});

fileManager.addCommand("compress", async (source, destination) => {
  await zip.compress(source, destination);
});

fileManager.addCommand("decompress", async (source, destination) => {
  await zip.decompress(source, destination);
});

export { fileManager };
