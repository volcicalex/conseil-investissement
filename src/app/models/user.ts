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

    constructor(authData){
        this.email = authData.email
        this.nom = authData.nom
        this.prenom = authData.prenom
        this.pseudo = authData.pseudo
        this.roles = { reader: true }
    }
}

