import { readdir } from "fs/promises";
import { homedir } from "os";
import { resolve } from "path";

class NavigationManager {
  constructor() {}

  up() {
    if (process.cwd() !== homedir()) {
      process.chdir("..");
    }
  }

  async ls() {
    const dirContent = await readdir(process.cwd(), { withFileTypes: true });
    const files = [];
    const folders = [];

    for (const item of dirContent) {
      if (item.isFile()) {
        files.push({ name: item.name, type: "file" });
      } else if (item.isDirectory()) {
        folders.push({ name: item.name, type: "directory" });
      }
    }

    console.table([
      ...folders.sort((a, b) => a.name.localeCompare(b.name)),
      ...files.sort((a, b) => a.name.localeCompare(b.name)),
    ]);
  }

  cd(source) {
    const destination = resolve(process.cwd(), source.replace(/^~/, homedir()));
    process.chdir(destination);
  }
}

export { NavigationManager };
