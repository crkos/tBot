import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import Tag from "../../db/models/tag.model";



module.exports = {
    category: 'tags',
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('addtag')
        .setDescription('Add a new tag')
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('Name of the tag')
        )
        .addStringOption(option =>
            option
                .setName('description')
                .setDescription('Description of the tag')
        )
    ,
    async execute(interaction: ChatInputCommandInteraction) {
        const tagName = interaction.options.getString('name');
        const tagDescription = interaction.options.getString('description');

        try {

            const tag = await Tag.create({
                name: tagName,
                description: tagDescription,
                username: interaction.user.username
            });


            return interaction.reply(`Tag ${tag.name} added`)

        } catch (error: any) {
            if(error.name === 'SequelizeUniqueConstraintError') {
                return interaction.reply('This tag already exists');
            }
            return interaction.reply('Something went wrong with the adding a tag');
        }
    }
}