import {AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import Materia from "../../db/models/materia.model";



module.exports = {
    category: 'materias',
    cooldown: 5,
    data: new SlashCommandBuilder()
        .setName('deletemateria')
        .setDescription('Borra una materia')
        .addStringOption(option =>
            option
                .setName('nombre')
                .setDescription('Nombre de la materia')
                .setRequired(true)
                .setAutocomplete(true)
        )
    ,
    async autocomplete(interaction: AutocompleteInteraction) {
        const focusedValue = interaction.options.getFocused();
        const choices = await Materia.findAll()
        const onlyNames = choices.map(choice => choice.nombre);
        const filteredNames = onlyNames.filter(name => name.startsWith(focusedValue));
        await interaction.respond(
            filteredNames.map(name => ({name: name, value: name}))
        )
    }
    ,
    async execute(interaction: ChatInputCommandInteraction) {
        const materiaName = interaction.options.getString("nombre", true);

        const rowCount = await Materia.destroy({where: {nombre: materiaName}});

        if(!rowCount) return interaction.reply('Esta materia no existe.');

        return interaction.reply('Materia borrada');
    }
}