import {SlashCommandBuilder} from "@discordjs/builders";
import {CommandData} from "./command";
import {Client, CommandInteraction} from "discord.js";

export const CommandTranslate: CommandData = {
    data: new SlashCommandBuilder()
        .setName("translate")
        .setDescription("Traduction du langage humain vers chat")
        .addStringOption(option=> option.setName("message").setDescription("Plus c'est petit mieux c'est").setRequired(true))
        .toJSON(),
    run: async (client: Client, interaction: CommandInteraction) => {
        //On récupère les options
        let message = interaction.options.getString('message')??null;

        await interaction.deferReply();

        //On vérifie que les deux ne valent pas 0 (le max est réglé a 1 mais on sait jamais)
        if(message == null) {
            await interaction.followUp({
                ephemeral: true,
                content: "Merci de rentrer un texte pour traduire !"
            });

            return;
        }

        let words: string[] = message.split(" ");
        let translated = "";

        for (let i = 0; i < words.length; i++) {

            let word = words[i];
            let length = word.length;

            if(length <= 4) {
                translated += "chcolat"
            } else {
                let w = Math.random() <= 0.5 ? "C" : "c";
                let count = length - 1;
                let t = 0;

                while(t < 4) {
                    let n = Math.random() * count / (4 - t);
                    for (let j = 0; j < n; j++) {
                        switch (t) {
                            case 0:
                                w += "h";
                                break;
                            case 1:
                                w += "o";
                                break;
                            case 2:
                                w += "c"
                                break;
                            case 3:
                                w += "o"
                                break;
                        }
                    }
                    count -= n;
                    t++;
                }

                translated += w;
            }

            
            if(i + 1 < words.length) {
                translated += " ";
            }

        }

        //On repond a celui qui a fait la commande
        await interaction.followUp({
            content: "Message : " + message
        })
        await interaction.followUp({
            content: "Traduction : " + translated
        })
    }
}
