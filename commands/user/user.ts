import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user'),
    async execute(interaction: ChatInputCommandInteraction) {
        await interaction.reply(`This command was run by ${interaction.user.username}, who joined on ${interaction.user.createdAt}.`);
    }
}