import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import Tag from "../../db/models/tag.model";


module.exports = {
    category: 'tags',
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('shwotags')
        .setDescription('Show all tags')
    ,
    async execute(interaction: ChatInputCommandInteraction) {
        const tagList = await Tag.findAll({attributes: ['name']});
        const tagString = tagList.map(t => t.name).join(', ' || 'No tags set.');

        return interaction.reply(`List of tags: ${tagString}`);

    }
}