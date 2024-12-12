import { Client, Role} from "npm:discord.js";
import LogWebhook from "../utils/webhook.ts";
export default {
  event: "roleCreate",
  once: false,
  action: async (
    _client: Client,
    _config: any,
    role: Role
  ) => {
    const logger = LogWebhook();

    await logger.send('Role Created', {
        title: '➕ Role Created',
        color: 0x3498DB,
        fields: [
          { name: 'Role Name', value: role.name },
          { name: 'Role ID', value: role.id },
          { name: 'Guild', value: `${role.guild.name} (${role.guild.id})` },
          { name: 'Role Color', value: role.hexColor },
          { name: 'Mentionable', value: role.mentionable ? 'Yes' : 'No', inline: true },
          { name: 'Hoisted', value: role.hoist ? 'Yes' : 'No', inline: true }
        ]
      });
    }
  };