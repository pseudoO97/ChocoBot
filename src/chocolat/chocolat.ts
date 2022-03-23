/**
 * Renvoit un "chocolat" aléatoire parmis la liste
 */
export const Chocolat = (): string => {
    const messages: string[] = ['chocolat', 'chocolate', 'CHOCOLAT', 'chocoooo', 'CHOCOOOLATA', 'CHOCO', 'choco', 'chocccoolat', 'chocolat?'];

    return messages[Math.round(Math.random() * (messages.length - 1))];
}

/**
 * Renvoit un texte de "chocolat" selon la liste de string
 * @param size - longueur du texte
 * @param random - si la taille peut varier
 */
export const ChocolatText = (size: number, random: boolean = false): string => {
    let message: string = "";

    if(random) {
        size = Math.random() * (size - 1) + 1;
    }

    for (let i = 0; i < size; i++) {
        message += Chocolat();
        if(i+1<size){
            message += " ";
        }
    }

    return message;
}