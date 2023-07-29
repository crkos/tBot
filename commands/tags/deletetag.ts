import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import Tag from "../../db/models/tag.model";


module.exports = {
    category: 'tags',
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('deletetag')
        .setDescription('Show all tags')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('Tag to delete')
        )
    ,
    async execute(interaction: ChatInputCommandInteraction) {
        const tagName = interaction.options.getString('name');

        const rowCount = await Tag.destroy({where: {name: tagName}});

        if(!rowCount) return interaction.reply('That tag doesn\'t exist.');

        return interaction.reply('Tag deleted');

    }
}