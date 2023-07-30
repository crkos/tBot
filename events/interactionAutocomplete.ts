import { AutocompleteInteraction, ChatInputCommandInteraction, Collection, Events, time } from 'discord.js';
import { client } from '../index';

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction: AutocompleteInteraction) {
		if (!interaction.isAutocomplete()) return;

		const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			await command.autocomplete(interaction);
		}
		catch (error) {
			console.log(error);
		}

	},
};