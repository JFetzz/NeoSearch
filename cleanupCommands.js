require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const clientId = process.env.NEO_ID;
const guildId = process.env.SERVER_ID;
const token = process.env.TOKEN;

const rest = new REST({ version: "9" }).setToken(token);

(async () => {
  try {
    // Fetch all global commands
    const globalCommands = await rest.get(Routes.applicationCommands(clientId));

    // Fetch all guild-specific commands
    const guildCommands = await rest.get(
      Routes.applicationGuildCommands(clientId, guildId)
    );

    // Delete all global commands
    for (const command of globalCommands) {
      await rest.delete(
        `${Routes.applicationCommands(clientId)}/${command.id}`
      );
      console.log(`🧬 Deleted global command: ${command.name}`);
    }

    // Delete all guild-specific commands
    for (const command of guildCommands) {
      await rest.delete(
        `${Routes.applicationGuildCommands(clientId, guildId)}/${command.id}`
      );
      console.log(`🧬 Deleted guild command: ${command.name}`);
    }

    console.log("💠 Successfully deleted all duplicate commands 💠");
  } catch (error) {
    console.error(error);
  }
})();
