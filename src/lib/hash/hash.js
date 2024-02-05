import { createHash } from "crypto";
import { createReadStream } from "fs";

class Hash {
  constructor() {}
  async encode(source) {
    try {
      const hash = createHash("sha256");
      const readStream = createReadStream(source);

      readStream.pipe(hash).on("finish", () => {
        console.log(hash.digest("hex"));
      });
    } catch (error) {
      console.error("Operation failed");
    }
  }
}

export { Hash };
