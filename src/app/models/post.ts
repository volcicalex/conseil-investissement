import { Commentaire } from "./commentaire";
import { User } from "./user";
import { AuthService } from "../services/auth.service";
import { Rubric } from "./rubric";

export class Post{
    id: string;
    titre: string;
    auteur: User;
    date: Date;
    description: string;
    resume: string;
    listComment: Commentaire[];
    nbLike: number;
    categorie: Rubric;

    constructor(titre: string,
                auteur: User,
                description: string,
                resume: string)
    {
        this.id = Math.random().toString(36).substr(2, 9);
        this.titre = titre
        this.auteur = auteur;
        this.date = new Date()
        this.description = description
        this.resume = resume
        this.nbLike = 0;
    }
}