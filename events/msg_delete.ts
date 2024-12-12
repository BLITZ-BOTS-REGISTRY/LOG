import { Client, Message } from "npm:discord.js";
import LogWebhook from "../utils/webhook.ts";
import { truncate } from "../utils/index.ts";
export default {
  event: "messageDelete",
  once: false,
  action: async (
  _client: Client,
    _config: any,
    message: Message
  ) => {
    const logger = LogWebhook();

      
      if (message.system || message.author?.bot) return;

      await logger.send('Message Deleted', {
        title: '🗑️ Message Deleted',
        color: 0xE74C3C,
        fields: [
          { name: 'Author', value: message.author ? `${message.author.tag} (${message.author.id})` : 'Unknown Author' },
          { name: 'Channel', value: `${message.channel.toString()} (${message.channel.id})` },
          { name: 'Guild', value: message.guild ? `${message.guild.name} (${message.guild.id})` : 'Direct Message' },
          { name: 'Message Content', value: truncate(message.content, 1000) }
        ]
      });
    }
  };