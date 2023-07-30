import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import Materia from '../../db/models/materia.model';
import Tarea from '../../db/models/tarea.model';
import { Tareas } from '../../types/typings';


module.exports = {
	category: 'tareas',
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('tareas')
		.setDescription('Muestra las tareas de una materia')
		.addStringOption(option =>
			option
				.setName('materia')
				.setDescription('Nombre de la materia')
				.setRequired(true)
				.setAutocomplete(true),
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
		const materiaName = interaction.options.getString('materia');
		const choices = await Materia.findOne({
			include: Tarea,
			where: { nombre: materiaName, guildId: interaction.guildId },
		});
		let tareaStr: string = '';

		if (!choices) {
			return interaction.reply('No existe esta materia');
		}

		if (!choices.tareas) {
			return interaction.reply('No hay tareas para esta materia');
		}

		const tareas = choices.tareas.map(tarea => {
			const tareas: Tareas = { titulo: tarea.titulo, descripcion: tarea.contenido };
			return tareas;
		});

		for (const tarea of tareas) {
			tareaStr += `# ${tarea.titulo} \n *  ${tarea.descripcion} \n`;
		}


		return interaction.reply(`Tareas: \n${tareaStr}`);
	},
};