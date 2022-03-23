import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandData} from "./command";
import {Client, CommandInteraction} from "discord.js";
import {Chocolat} from "../chocolat/chocolat";

export const Commandchoco: CommandData = {
    data: new SlashCommandBuilder()
        .setName("choco")
        .setDescription("le serveur va s'enculer!!!! ATTENTION !!!!")
        .addNumberOption(option=> option.setName("unknown").setMinValue(1).setMaxValue(10).setDescription("Plus c'est petit plus que c'est mieux").setRequired(true))
        .toJSON(),
    run: async (client: Client, interaction: CommandInteraction) => {
        const wait = require('node:timers/promises').setTimeout;

        //On récupère les options
        let iterations = interaction.options.getNumber('unknown')??0;

        //On vérifie que les deux ne valent pas 0
        if(iterations == 0) {
            await interaction.followUp({
                ephemeral: true,
                content: "Il manque un chiffre !"
            });

            return;
        }

        //on envoit le spam
        for (let i = 0; i < 10 * iterations; i++) {
            await wait(500);
            interaction.channel?.send(Chocolat());
        }


    }
}
