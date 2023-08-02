import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import Materia from '../../db/models/materia.model';


module.exports = {
	category: 'materias',
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('addmateria')
		.setDescription('Añade una nueva materia')
		.addStringOption(option =>
			option
				.setName('nombre')
				.setDescription('Nombre de la materia')
				.setRequired(true),
		),
	async execute(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();
		const materiaName = interaction.options.getString('nombre', true);

		try {
			const materia = await Materia.create({
				nombre: materiaName,
				guildId: interaction.guildId,
			});

			return interaction.editReply(`Se ha añadido ${materia.nombre}`);


		} catch (error: any) {
			if (error.name === 'SequelizeUniqueConstraintError') {
				return interaction.editReply('Esta materia ya existe');
			}
			console.log(error);

			return interaction.editReply('Hubo un error, intenta mas tarde');
		}

	},
};