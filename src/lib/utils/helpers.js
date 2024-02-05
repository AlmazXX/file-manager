const extractCommand = (input) => {
  const { 0: command, 1: source, 2: destination } = input.trim().split(" ");
  return { command, source, destination };
};

export { extractCommand };
