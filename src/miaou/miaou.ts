/**
 * Renvoit un "miaou" aléatoire parmis la liste
 */
export const Miaou = (): string => {
    const messages: string[] = ['miaou', 'miou', 'MIAOU', 'miiaaouu', 'MIAAOUU', 'miiii', 'miiiouu', 'miiiaaa', 'miaou?'];

    return messages[Math.round(Math.random() * (messages.length - 1))];
}

/**
 * Renvoit un texte de "miaou" selon la liste
 * @param size - longueur du texte
 * @param random - si la taille peut varier
 */
export const MiaouText = (size: number, random: boolean = false): string => {
    let message: string = "";

    if(random) {
        size = Math.random() * (size - 1) + 1;
    }

    for (let i = 0; i < size; i++) {
        message += Miaou();
        if(i+1<size){
            message += " ";
        }
    }

    return message;
}