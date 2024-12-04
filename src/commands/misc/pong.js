module.exports = {
    name: 'pong',
    description: 'Replies with the bot ping!',
  
    callback: async (client, interaction) => {
      await interaction.deferReply();
  
      const reply = await interaction.fetchReply();
  
      const ping = reply.createdTimestamp - interaction.createdTimestamp;
  
      interaction.editReply(
        `Ping! Client ${ping}ms | Websocket: ${client.ws.ping}ms`
      );
    },
  };