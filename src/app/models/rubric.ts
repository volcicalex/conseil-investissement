/**
 * Json node data with nested structure. Each node has a filename and a value or a list of children
 */
export class Rubric {
    id: string;
    nom: string;

    constructor(nom: string){
      this.id = Math.random().toString(36).substr(2, 9);
      this.nom = nom;
    }
  }