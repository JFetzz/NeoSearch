require('dotenv/config');
const { Client, IntentsBitField } = require('discord.js');
const consoleLog = require('./events/ready/consoleLog');
const eventHandler = require('./handlers/eventHandler');
const registerCommands = require('./events/ready/01registerCommands');

console.log("🟢 Initializing Client...");
const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildPresences,
        IntentsBitField.Flags.MessageContent,
    ],
});

(async () => {
    try {
      console.log('🌎 Connecting to Search Engine...');
  
      eventHandler(client);
      client.login(process.env.TOKEN);

      client.once('ready', async () => {
        console.log("🤖 NeoSearch is online!");
        consoleLog(client);

        await registerCommands(client);
        console.log("✅ Commands registered.");
      });

    } catch (error) {
      console.log(`Error: ${error}`);
    }
  })();
