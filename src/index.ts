#!/usr/bin/env node

import { getTitle } from "title";
import { getCommand } from "command"
import { loadSMTP } from "smtp";

console.log(getTitle())

const command = getCommand()
command.action((port) => {
  port = port ? port : 1025
  const raw = command.getOptionValue("raw") || false
  let html = command.getOptionValue("html") || false
  html = !html && !raw ? true : html
  loadSMTP({ port, raw, html })
})
command.outputHelp();
command.parse()
