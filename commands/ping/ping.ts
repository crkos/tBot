import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";


module.exports = {
    category: 'ping',
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with a pong!'),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply("Pong!");
    }
}