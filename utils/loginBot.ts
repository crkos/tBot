import {Client} from "discord.js";

export async function loginBot(client: Client) {
    await client.login(process.env.DISCORD_BOT_TOKEN);
}