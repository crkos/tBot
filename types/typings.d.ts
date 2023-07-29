import {AutocompleteInteraction, ChatInputCommandInteraction, Collection, SlashCommandBuilder} from "discord.js";

export interface CommandAction {
    data: SlashCommandBuilder,
    execute: (interaction: ChatInputCommandInteraction) => Promise<void>,
    autocomplete: (interaction: AutocompleteInteraction) => Promise<void>
    cooldown?: number,
    category?: string
}

declare module 'discord.js' {
    interface Client {
        commands: Collection<string, CommandAction>,
        cooldowns: Collection<string, Collection<string, number>>
    }
}