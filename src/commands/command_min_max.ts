import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandData} from "./command";
import {Client, CommandInteraction} from "discord.js";

export const CommandMinMax: CommandData = {
    data: new SlashCommandBuilder()
        .setName("minmax")
        .setDescription("Genère un nombre compris entre le min et le max")
        .addNumberOption(option=> option.setName("min").setMinValue(0).setDescription("La valeur minimum").setRequired(true))
        .addNumberOption(option=> option.setName("max").setMinValue(1).setDescription("La valeur maximum").setRequired(true))
        .toJSON(),
    run: async (client: Client, interaction: CommandInteraction) => {
        //On récupère les options
        let min = interaction.options.getNumber('min')??0;
        let max = interaction.options.getNumber('max')??0;

        //On vérifie que les deux ne valent pas 0 (le max est réglé a 1 mais on sait jamais)
        if(min == 0 && max == 0) {
            await interaction.followUp({
                ephemeral: true,
                content: "Il manque des nombres !"
            });

            return;
        }

        //On remet le min et max dans le bon sens
        let t = max;
        if(min > max) {
            max = min;
            min = t;
        }

        //On récupère notre chiffre aléatoire
        let value = Math.round(Math.random() * (max - min)) + min;

        let message = `[${min} - ${max}] Et voici votre chiffre : ${value}`;

        if(value == min) {
            message = "Oh non qu'elle décéption de tomber sur " + value + " (Min)";
        }

        if(value == max) {
            message = value + " ça c'est un chiffre qui en jette ! (Max)"
        }

        //On répond uniquement a celui qui execute la commande
        await interaction.followUp({
            ephemeral: true,
            content: message
        });
    }
}
