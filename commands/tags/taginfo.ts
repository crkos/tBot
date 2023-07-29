import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import Tag from "../../db/models/tag.model";


module.exports = {
    category: 'tags',
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('taginfo')
        .setDescription('Get info of a tag')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('Name of the tag')
        )
    ,
    async execute(interaction: ChatInputCommandInteraction) {
        const tagName= interaction.options.getString('name');

        const tag = await Tag.findOne({where: {name: tagName}});

        if(tag) {
            return interaction.reply(`${tagName} was created by ${tag.username} at ${tag.createdAt} and has been used ${tag.usage_count} times`);
        }

        return interaction.reply(`Could not find tag: ${tagName}`);

    }
}