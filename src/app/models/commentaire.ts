import { User } from "./user";

export class Commentaire{
    id: string;
    idsFather: string;
    children: Commentaire[];
    auteur: User;
    date: Date;
    texte: string;
    nbLike: number;

    constructor(idsFather, comment: any){
        if (typeof comment == 'object') {
            this.id = comment.id  
            this.idsFather = idsFather
            this.auteur = comment.auteur
            this.date = new Date(comment.date)
            this.texte = comment.texte
            this.nbLike = comment.nbLike
        }
    }
}