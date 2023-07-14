import chalk from "chalk"
import { SMTPServer } from "smtp-server"
import { simpleParser } from "mailparser"
import { formatHeader, formatHtml, formatRaw } from "format";

type SMTPParam = {
  port: string
  raw: boolean
  html: boolean
}

export const loadSMTP = function ({ port, raw, html }: SMTPParam) {
  const host = "127.0.0.1"
  const smtpServer = new SMTPServer({
    banner: undefined,
    secure: false,
    logger: false,
    disabledCommands: ["STARTTLS"],
    onAuth(auth, session, callback) {
      return callback(null, {
        user: "fakesmtp",
      })
    },
    async onData(stream, session, callback) {
      const mail = await simpleParser(stream)

      console.log(chalk.cyan(`
${formatHeader(mail)}
${raw ? formatRaw(mail) : ""}
${html ? formatHtml(mail) : ""}
`))

      return callback()
    },
  })

  smtpServer.on("error", (err) => {
    console.log(chalk.red("Error", err))
  })

  smtpServer.listen(+port, host, () => {
    const opts = ([] as string[]).concat(raw ? ["RAW"] : []).concat(html ? ["HTML"] : [])
    console.log(chalk.yellow(`
Fake SMTP Server running on port ${port} with opts ${opts.join(" and ")}`))
  })
}