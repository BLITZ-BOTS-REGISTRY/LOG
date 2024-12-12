import { Client, Role} from "npm:discord.js";
import LogWebhook from "../utils/webhook.ts";

export default {
  event: "roleDelete",
  once: false,
  action: async (
    _client: Client,
    _config: any,
    role: Role
  ) => {
    const logger = LogWebhook();
    await logger.send('Role Deleted', {
      title: '➖ Role Deleted',
      color: 0xE74C3C,
      fields: [
        { name: 'Role Name', value: role.name },
        { name: 'Role ID', value: role.id },
        { name: 'Guild', value: `${role.guild.name} (${role.guild.id})` }
      ]
    });
    }
  };