import {Client, Message, MessageMentions} from "discord.js";
import {Chocolat,ChocolatText} from "../chocolat/chocolat";

/**
 * On crée une méthode d'exportation qui va permettre de savoir si un user_discord envoie un message
 * @param client
 */
export default (client: Client): void => {

    //On récupère l'event lorsqu'un message est crée
    client.on("messageCreate", async (message: Message) => {

        if(message.author.bot) return;

        //On récupère le message
        const content = message.content;

        // @ts-ignore
        if(message.mentions.has(client.user.id)) {
            const shoot = client.emojis.cache.random();
            message.channel.send(`${ChocolatText(4, true)} ${shoot}`);
        }

        //Si miaou est tapé on envoie un autre message
        if (content.includes("chocolat")) {
            await message.reply(Chocolat())
        }

    })
};