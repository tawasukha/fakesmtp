import chalk from "chalk"
import figlet from "figlet"

export const getTitle = function () {
  const title = 'FakeSMTP'
  return chalk.blue(figlet.textSync(title, {
    horizontalLayout: "fitted",
  }))
}