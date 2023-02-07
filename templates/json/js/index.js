const DiscordClient = require('./core/DiscordClient')
const { IntentsBitField } = require('discord.js')
const { config } = require('dotenv')
const fs = require('fs')
const path = require('path')

if (fs.existsSync(path.join(__dirname, '..', '.env'))) {
    config()
}

const client = new DiscordClient({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.GuildMessages,
    ],
    autoBoot: true
})

if (!process.env.TOKEN) {
    console.error('No environment variable "TOKEN" found. Please set the environment variable with your bot token.')
    process.exit(-1)
}

client.login(process.env.TOKEN)
