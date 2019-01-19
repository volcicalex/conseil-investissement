import { FormGroup } from "@angular/forms";

export interface Roles{
    reader: boolean
    author?: boolean
    admin?: boolean
}

export class User{
    id: string
    email: string
    nom: string
    prenom: string
    pseudo: string
    roles: Roles

    constructor(signUpForm: FormGroup){
        this.id = Math.random().toString(36).substr(2, 9);
        this.email = signUpForm.get('email').value
        this.nom = signUpForm.get('nom').value
        this.prenom = signUpForm.get('prenom').value
        this.pseudo = signUpForm.get('pseudo').value
        this.roles = { reader: true }
    }
}

