import { Command } from "commander";

export const getCommand = function () {
  const command = new Command()
  command.version('1.0.0')
    .argument('[port]', 'connect to the specified port (default 1025)')
    .option('-h, --html', 'display HTML')
    .option('-r, --raw', 'display Raw')
  return command
}