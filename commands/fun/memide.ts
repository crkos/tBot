import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';


module.exports = {
	category: 'fun',
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('memide')
		.setDescription('¿Cuanto te mide?'),
	async execute(interaction: ChatInputCommandInteraction) {
		const randNum = Math.floor(Math.random() * 20);
		let strMeMide = ':';

		for (let i = 0; i < randNum; i++) {
			strMeMide += '=';
		}
		strMeMide += '>';

		await interaction.reply(`Te mide ${randNum}cm ${strMeMide}`);

	},
};