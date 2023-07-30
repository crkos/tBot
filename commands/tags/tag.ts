import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import Tag from '../../db/models/tag.model';


module.exports = {
	category: 'tags',
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('tag')
		.setDescription('Get tag')
		.addStringOption(option =>
			option
				.setName('name')
				.setDescription('Name of the tag'),
		),
	async execute(interaction: ChatInputCommandInteraction) {
		const tagName = interaction.options.getString('name');

		const tag = await Tag.findOne({ where: { name: tagName } });

		if (tag) {
			await tag.increment('usage_count');

			return interaction.reply(tag.get('description'));
		}

		return interaction.reply(`Could not find tag: ${tagName}`);
	},
};