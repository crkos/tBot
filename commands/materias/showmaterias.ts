import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import Materia from '../../db/models/materia.model';


module.exports = {
	category: 'materias',
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('showmaterias')
		.setDescription('Muestra todas las materias'),
	async execute(interaction: ChatInputCommandInteraction) {
		await interaction.deferReply();
		const materiasList = await Materia.findAll({ attributes: ['nombre'], where: { guildId: interaction.guildId } });
		const materiaString = materiasList.map(t => t.nombre).join('\n' || 'No hay materias.');

		return interaction.editReply(`Lista de materias: \n${materiaString}`);

	},
};