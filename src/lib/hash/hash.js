import { createHash } from "crypto";
import { createReadStream } from "fs";
import { pipeline } from "stream/promises";

class Hash {
  constructor() {}
  async encode(source) {
    try {
      const hash = createHash("sha256");
      const readStream = createReadStream(source);

      await pipeline(readStream, hash.setEncoding("hex"), async (source) => {
        for await (const chunk of source) {
          console.log("%s", chunk);
        }
      });
    } catch {
      console.error("Operation failed");
    }
  }
}

export { Hash };
