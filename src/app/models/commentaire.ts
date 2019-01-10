import { User } from "./user";

export class Commentaire{
    id: string;
    auteur: User;
    date: Date;
    texte: string;
    nbLike: number;
}