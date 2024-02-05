import fs from "fs";
import { join, basename } from "path";
import { pipeline } from "stream/promises";

class FileSystem {
  constructor() {}

  create(source) {
    fs.writeFile(source, "", { flag: "wx" }, (err) => {
      if (err) {
        console.error("Operation failed");
      }
    });
  }

  read(source) {
    fs.createReadStream(source)
      .on("error", () => {
        console.error("Operation failed");
      })
      .pipe(process.stdout)
      .on("error", () => {
        console.error("Operation failed");
      });
  }

  remove(source) {
    fs.rm(source, {}, (err) => {
      if (err) {
        console.error("Operation failed");
      }
    });
  }

  async copy(source, destination) {
    try {
      await pipeline(
        fs.createReadStream(source),
        fs.createWriteStream(join(destination, basename(source)), {
          flags: "wx",
        })
      );
    } catch (error) {
      console.error(error);
    }
  }

  rename(source, destination) {
    fs.rename(source, destination, (err) => {
      if (err) {
        console.error("Operation failed");
      }
    });
  }

  async move(source, destination) {
    try {
      await this.copy(source, destination);
      this.remove(source);
    } catch (error) {
      console.error(error);
    }
  }
}

export default FileSystem;
