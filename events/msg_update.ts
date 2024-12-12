import { Client, Message } from "npm:discord.js";
import LogWebhook from "../utils/webhook.ts";
import { truncate } from "../utils/index.ts";
export default {
  event: "messageUpdate",
  once: false,
  action: async (
  _client: Client,
    _config: any,
    oldMessage: Message, 
    newMessage: Message
  ) => {
    const logger = LogWebhook();
 
    if (oldMessage.content === newMessage.content) return;

    await logger.send('Message Updated', {
      title: '✏️ Message Edited',
      color: 0x3498DB,
      fields: [
        { name: 'Author', value: `${newMessage.author.tag} (${newMessage.author.id})`, inline: true },
        { name: 'Channel', value: `${newMessage.channel.toString()} (${newMessage.channel.id})`, inline: true },
        { name: 'Old Content', value: truncate(oldMessage.content || 'No previous content') },
        { name: 'New Content', value: truncate(newMessage.content || 'No new content') }
      ]
    });
    }
  };