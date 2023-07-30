import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import Materia from '../../db/models/materia.model';


module.exports = {
	category: 'materias',
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('editmateria')
		.setDescription('Edita una materia')
		.addStringOption(option =>
			option
				.setName('nombre')
				.setDescription('Nombre de la materia')
				.setRequired(true)
				.setAutocomplete(true),
		)
		.addStringOption(option =>
			option
				.setName('nombre_editado')
				.setDescription('Nombre editado de la materia')
				.setRequired(true),
		),
	async autocomplete(interaction: AutocompleteInteraction) {
		const focusedValue = interaction.options.getFocused();
		const choices = await Materia.findAll({ where: { guildId: interaction.guildId } });
		const onlyNames = choices.map(choice => choice.nombre);
		const filteredNames = onlyNames.filter(name => name.startsWith(focusedValue));
		await interaction.respond(
			filteredNames.map(name => ({ name: name, value: name })),
		);
	},
	async execute(interaction: ChatInputCommandInteraction) {
		const materiaName = interaction.options.getString('nombre', true);
		const materiaEditadoName = interaction.options.getString('nombre_editado');

		const [affectedRows] = await Materia.update({ nombre: materiaEditadoName }, { where: { nombre: materiaName } });

		if (affectedRows > 0) {
			return interaction.reply(`La materia cambio a ${materiaEditadoName}`);
		}

		return interaction.reply('No se encontro la materia');
	},
};