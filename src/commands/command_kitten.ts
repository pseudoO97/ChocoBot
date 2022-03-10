import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandData} from "./command";
import {Client, CommandInteraction} from "discord.js";
import {Miaou} from "../miaou/miaou";

export const CommandKitten: CommandData = {
    data: new SlashCommandBuilder()
        .setName("kitten")
        .setDescription("Si tu veux casser le serveur vas-y")
        .addNumberOption(option=> option.setName("unknown").setMinValue(1).setMaxValue(10).setDescription("Plus c'est petit mieux c'est").setRequired(true))
        .toJSON(),
    run: async (client: Client, interaction: CommandInteraction) => {
        const wait = require('node:timers/promises').setTimeout;

        //On récupère les options
        let iterations = interaction.options.getNumber('unknown')??0;

        //On vérifie que les deux ne valent pas 0 (le max est réglé a 1 mais on sait jamais)
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
            interaction.channel?.send(Miaou());
        }


    }
}
