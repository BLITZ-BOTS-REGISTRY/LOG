import { WebhookClient, EmbedBuilder } from "npm:discord.js";
import * as path from "jsr:@std/path";
import * as yaml from "npm:yaml";

interface LogOptions {
  title?: string;
  description?: string;
  color?: number;
  fields?: { name: string; value: string; inline?: boolean }[];
  timestamp?: Date;
}

interface BlitzConfig {
    config: { log_webhook?: string; }
  
}

export default function LogWebhook() {
  // Resolve config path starting from the current file's directory and going up
  const currentFilePath = path.fromFileUrl(import.meta.url);
  const configPath = path.resolve(path.dirname(currentFilePath), '../blitz.config.yaml');

  // Read and parse the config file
  let webhookUrl: string;
  try {
    const configFile = Deno.readTextFileSync(configPath);
    const config: BlitzConfig = yaml.parse(configFile);


    if (!config.config.log_webhook) {
      throw new Error('No log_webhook found in configuration');
    }

    webhookUrl = config.config.log_webhook;
  } catch (error) {
    console.error('Failed to read webhook configuration:', error);
    throw new Error('Unable to initialize logging webhook');
  }

  // Create webhook client
  const webhookClient = new WebhookClient({ url: webhookUrl });

  return {
    send: async (message: string, options: LogOptions = {}) => {
      try {
        const embed = new EmbedBuilder()
          .setDescription(message)
          .setColor(options.color || 0x0099ff)
          .setTimestamp(options.timestamp || new Date());

        if (options.title) {
          embed.setTitle(options.title);
        }

        if (options.description) {
          embed.setDescription(options.description);
        }

        if (options.fields) {
          embed.addFields(options.fields);
        }

        await webhookClient.send({
          content: null,
          embeds: [embed]
        });
      } catch (error) {
        console.error('Failed to send webhook log:', error);
      }
    },

    error: async (message: string, options: LogOptions = {}) => {
      await this.send(message, {
        ...options,
        color: 0xFF0000 // Red color for errors
      });
    },

    success: async (message: string, options: LogOptions = {}) => {
      await this.send(message, {
        ...options,
        color: 0x00FF00 // Green color for success
      });
    }
  };
}