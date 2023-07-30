import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { client } from '../../index';
import { CommandAction } from '../../types/typings';


module.exports = {
	category: 'server',
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads a command.')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('The command to reload.')
				.setAutocomplete(true)
				.setRequired(true)),
	async autocomplete(interaction: AutocompleteInteraction) {
		const focusedValue = interaction.options.getFocused();
		const choices = client.commands.values();
		let allChoices: Array<CommandAction> = [];
		for (const choice of choices) {
			allChoices.push(choice);
		}
		const onlyNames = allChoices.map(name => name.data.name);
		const filteredNames = onlyNames.filter(name => name.startsWith(focusedValue));
		return interaction.respond(
			filteredNames.map(name => ({ name: name, value: name })),
		);

	}
	,
	async execute(interaction: ChatInputCommandInteraction) {
		const commandName = interaction.options.getString('command', true).toLowerCase();
		// @ts-ignore
		const command = interaction.client.commands.get(commandName);

		if (!command) {
			return interaction.reply(`There is no command with name \`${commandName}\`!`);
		}

		delete require.cache[require.resolve(`../${command.category}/${command.data.name}.ts`)];

		try {
			// @ts-ignore
			interaction.client.commands.delete(command.data.name);
			const newCommand = require(`../${command.category}/${command.data.name}.ts`);
			// @ts-ignore
			interaction.client.commands.set(newCommand.data.name, newCommand);
			await interaction.reply(`Command \`${newCommand.data.name}\` was reloaded!`);
		} catch (error: any) {
			console.error(error);
			await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
		}
	},
};