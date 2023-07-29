import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import Tag from "../../db/models/tag.model";
import Materia from "../../db/models/materia.model";



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
                .setRequired(true)
        )
    ,
    async execute(interaction: ChatInputCommandInteraction) {
        const materiaName = interaction.options.getString("nombre", true);

        try {
            const materia = await Materia.create({
                nombre: materiaName,
                guildId: interaction.guildId
            });

            return interaction.reply(`Se ha añadido ${materia.nombre}`);


        } catch (error: any) {
            if(error.name === 'SequelizeUniqueConstraintError') {
                return interaction.reply('Esta materia ya existe');
            }
            return interaction.reply('Hubo un error, intenta mas tarde');
        }

    }
}