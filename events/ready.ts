import { Client } from "npm:discord.js";
import LogWebhook from "../utils/webhook.ts";
export default {
  event: "ready",
  once: true,
  action: async (
    client: Client,
  ) => {
    const logger = LogWebhook();
      await logger.send('Bot Online', {
        title: '🟢 Bot Startup',
        fields: [
          { name: 'Bot Username', value: client.user?.username || 'Unknown', inline: true },
          { name: 'Bot Tag', value: client.user?.tag || 'Unknown', inline: true },
          { name: 'Total Guilds', value: `${client.guilds.cache.size}`, inline: true },
          { name: 'Total Channels', value: `${client.channels.cache.size}`, inline: true },
          { name: 'Total Users (Cached)', value: `${client.users.cache.size}`, inline: true }
        ]
      });
    }
  };