import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import Materia from '../../db/models/materia.model';
import Tarea from '../../db/models/tarea.model';


module.exports = {
	category: 'tareas',
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('addtarea')
		.setDescription('Añade una tarea a una materia')
		.addStringOption(option =>
			option
				.setName('nombre')
				.setDescription('Nombre de la materia')
				.setRequired(true)
				.setAutocomplete(true),
		)
		.addStringOption(option =>
			option
				.setName('titulo')
				.setDescription('Titulo de la tarea')
				.setRequired(true),
		)
		.addStringOption(option =>
			option
				.setName('descripcion')
				.setDescription('Descripción de la tarea')
				.setRequired(true),
		)
	,
	async autocomplete(interaction: AutocompleteInteraction) {
		const focusedValue = interaction.options.getFocused();
		const choices = await Materia.findAll();
		const onlyNames = choices.map(choice => choice.nombre);
		const filteredNames = onlyNames.filter(name => name.startsWith(focusedValue));
		await interaction.respond(
			filteredNames.map(name => ({ name: name, value: name })),
		);
	},
	async execute(interaction: ChatInputCommandInteraction) {
		const materiaName = interaction.options.getString('nombre', true);
		const tituloTarea = interaction.options.getString('titulo', true);
		const descripcionTarea = interaction.options.getString('descripcion', true);

		const materia = await Materia.findOne({ where: { nombre: materiaName, guildId: interaction.guildId } });

		if (!materia) {
			return interaction.reply('Esta materia no existe');
		}

		try {
			const newTarea = await Tarea.create({
				titulo: tituloTarea,
				contenido: descripcionTarea,
				materiaId: materia.id,
			});
			return interaction.reply(`Se ha creado la tarea con el titulo ${newTarea.titulo}`);
		} catch (error: any) {
			console.log(error);
			return interaction.reply('No se ah podido crear la tarea, intenta mas tarde.');
		}
	},
};