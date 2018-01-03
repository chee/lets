#!/usr/bin/env node
const {promisify} = require('util')
const fs = require('fs')
const irc = require('irc')

const readFile = promisify(fs.readFile)

const getLib = lib => readFile(`/usr/chee/lib/${lib}`)

const whatifs = getLib('whatif')
const lets = getLib('lets')
const wonders = getLib('wonder')

const getLine = async getBuffer => {
  const buffer = await getBuffer
  const lines = buffer.toString().split(/\n/)
  return lines[Math.floor(Math.random() * lines.length)]
}

const letLine = () => getLine(lets)
const whatifLine = () => getLine(whatifs)
const wonderLine = () => getLine(wonders)

const channel = '#chee-fanclub'
const client = new irc.Client('chat.freenode.net', 'goodideas', {
  channels: [channel],
  userName: 'goodideas',
  realName: 'goodideas'
})

client.addListener('message', (from, to, message) => {
  let line

  switch(message.toLowerCase()) {
    case 'let\'s':
    case 'lets':
      line = await letLine()
      break
    case 'what if':
    case 'whatif':
      line = await whatifLine()
      break
    case 'wonder':
    case 'i wonder':
      line = await wonderLine()
      break
    default:
      line = null
  }

  line && client.say(channel, line)
})
