import fs from "fs";
import { pipeline } from "stream/promises";
import zlib from "zlib";

class ZipManager {
  constructor() {}

  async compress(source, destination) {
    try {
      const readStream = fs.createReadStream(source);
      const gzipStream = zlib.createGzip();
      const writeStream = fs.createWriteStream(destination);

      await pipeline(readStream, gzipStream, writeStream);
    } catch (error) {
      console.error("Operation failed");
    }
  }

  async decompress(source, destination) {
    try {
      const readStream = fs.createReadStream(source);
      const gunzipStream = zlib.createGunzip();
      const writeStream = fs.createWriteStream(destination);

      await pipeline(readStream, gunzipStream, writeStream);
    } catch (error) {
      console.error("Operation failed");
    }
  }
}

export { ZipManager };
