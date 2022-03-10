import { Client } from "discord.js";
const { REST } = require('@discordjs/rest');
import {Routes} from "discord-api-types/v10";
import {CommandMinMax} from "../commands/command_min_max";
import {CommandKitten} from "../commands/command_kitten";
import {CommandTranslate} from "../commands/command_translate";

/**
 * On crée une méthode d'exportation qui va permettre de savoir si le client est bien lancé
 * @param client
 * @param token
 */
export default (client: Client, token?: string): void => {
    const rest = new REST({ version: '9' }).setToken(token)
    //On enregistre un event
    client.on("ready", async () => {

        //On vérifie que le bot est bien lancé
        if (!client.user || !client.application) {
            console.log('Can not start the bot');
            return;
        }

        //Enregistrement des commandes
        await rest.put(
            Routes.applicationCommands(client.application.id),
            { body: getCommandsData() },
        );

        //On dit à l'utilisateur que c'est ok
        console.log(`${client.user.username} is online`);
    });
};

export const Commands : any[] = [CommandKitten, CommandMinMax, CommandTranslate];

/**
 * On récupère en tableau les commandes en JSON
 */
const getCommandsData = (): any[] => {
    return Commands.map(c => c.data);
}

/**
 * Permet de retrouver une commande selon son nom
 * @param name - le nom de la commande a chercher
 */
export const findCommand = (name: string): any => {
    return Commands.find(c => c.data.name == name);
}