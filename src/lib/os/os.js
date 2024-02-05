import os from "os";
import Commander from "../commander/commander.js";

const opearatingSystem = new Commander();

opearatingSystem.addCommand("--EOL", () => {
  console.log("%o", os.EOL);
});

opearatingSystem.addCommand("--cpus", () => {
  const cpuData = os.cpus().map(({ model, speed }) => ({ model, speed }));
  console.log("Overall amount of CPUS is %d", cpuData.length);
  console.table(cpuData);
});

opearatingSystem.addCommand("--homedir", () => {
  console.log(os.homedir());
});

opearatingSystem.addCommand("--username", () => {
  console.log(os.userInfo().username);
});

opearatingSystem.addCommand("--architecture", () => {
  console.log(os.arch());
});

export { opearatingSystem };
