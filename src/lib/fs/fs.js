import fs from "fs";
import { join, basename } from "path";
import { pipeline } from "stream/promises";

class FileSystem {
  constructor() {}

  async create(source) {
    await fs.promises.writeFile(source, "", { flag: "wx" });
  }

  read(source) {
    return new Promise((resolve, reject) => {
      fs.createReadStream(source)
        .on("data", (chunk) => console.log("%s", chunk))
        .on("end", resolve)
        .on("error", () => {
          reject("Operation faild");
        });
    });
  }

  async remove(source) {
    try {
      await fs.promises.rm(source);
    } catch (error) {
      console.error("Operation faild");
    }
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

  async rename(source, destination) {
    try {
      await fs.promises.rename(source, destination);
    } catch (error) {
      console.error("Operation faild");
    }
  }

  async move(source, destination) {
    try {
      await this.copy(source, destination);
      await this.remove(source);
    } catch (error) {
      console.error(error);
    }
  }
}

export default FileSystem;
