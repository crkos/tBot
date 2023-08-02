import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import Materia from '../../db/models/materia.model';
import Tarea from '../../db/models/tarea.model';

module.exports = {
	category: 'tareas',
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('deletetarea')
		.setDescription('Borrar una tarea seleccionada')
		.addStringOption(option =>
			option
				.setName('nombre_titulo')
				.setDescription('Nombre del titulo de la tarea')
				.setAutocomplete(true)
				.setRequired(true),
		),
	async autocomplete(interaction: AutocompleteInteraction) {
		const focusedValue = interaction.options.getFocused();
		const choices = await Materia.findAll({ where: { guildId: interaction.guildId }, include: Tarea });
		const onlyTitles = choices.flatMap(choice => {
			return choice.tareas.map(tarea => tarea.titulo);
		});
		const filteredNames = onlyTitles.filter(name => name.startsWith(focusedValue));
		await interaction.respond(
			filteredNames.map(title => ({ name: title, value: title })),
		);
	},
	async execute(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();
		const title = interaction.options.getString('nombre_titulo', true);

		const rowCount = await Tarea.destroy({ where: { titulo: title } });

		if (!rowCount) return interaction.editReply('Esta tarea no existe');

		return interaction.editReply(`Se ha eliminado la tarea con titulo ${title}`);

	},
};

