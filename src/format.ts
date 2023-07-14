import { AddressObject, ParsedMail } from "mailparser";
import cliHtml from 'cli-html';

const line1 = "-".repeat(80)
const line2 = "=".repeat(80)

const formatAddress = function (address?: AddressObject | AddressObject[]) {
  return Array.isArray(address) ? address.map(value => value.text).join(", ") : address?.text || "-"
}

export const formatHeader = function (parsed: ParsedMail) {
  const from = parsed.from?.text
  const to = formatAddress(parsed.to)
  const replyTo = formatAddress(parsed.replyTo)
  const cc = formatAddress(parsed.cc)
  const bcc = formatAddress(parsed.bcc)
  const date = parsed.date?.toLocaleString()
  const id = parsed.messageId
  const subject = parsed.subject

  return `${id}

From     : ${from}
To       : ${to}
Reply To : ${replyTo}
CC       : ${cc}
BCC      : ${bcc}
Date     : ${date}

Subject  : ${subject}
${line1}
`
}

export const formatRaw = function (parsed: ParsedMail) {
  return `${parsed.html}
${line2}
`
}

export const formatHtml = function (parsed: ParsedMail) {
  return `${cliHtml(parsed.html)}
${line2}
`
}