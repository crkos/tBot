import { Client, Events } from 'discord.js';
import { sequelize } from '../db/config';

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client: Client) {
		await sequelize.sync();
		console.log(`Ready! Logged in as ${client.user?.tag}`);
	},
};