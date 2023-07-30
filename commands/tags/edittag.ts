import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import Tag from '../../db/models/tag.model';


module.exports = {
	category: 'tags',
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('edittag')
		.setDescription('Edit a tag')
		.addStringOption(option =>
			option
				.setName('name')
				.setDescription('Name of the tag'),
		)
		.addStringOption(option =>
			option
				.setName('description')
				.setDescription('Description of the tag'),
		),
	async execute(interaction: ChatInputCommandInteraction) {
		const tagName = interaction.options.getString('name');
		const tagDescription = interaction.options.getString('description');

		const [affectedRows] = await Tag.update({ description: tagDescription }, { where: { name: tagName } });

		if (affectedRows > 0) {
			return interaction.reply(`Tag ${tagName} was edited`);
		}

		return interaction.reply(`Could not find a tag with name ${tagName}`);

	},
};