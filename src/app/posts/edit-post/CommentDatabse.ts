import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Commentaire } from "src/app/models/commentaire";

/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
**/ 
@Injectable()
export class CommentDatabase {

  dataChange = new BehaviorSubject<Commentaire[]>([]);

  get data(): Commentaire[] { return this.dataChange.value; }

  constructor() {}

  initialize(object: any) {
    // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
    //     file node as children.
    object.id = ""
    let comment = new Commentaire("listComment", object);
    const data = this.buildFileTree(object, 0, comment);

    // Notify the change.
    this.dataChange.next(data);
  }

  addFather(comment: Commentaire): void{
    for (let child of comment.children){
      if (comment.idsFather != undefined) child.idsFather = comment.idsFather + "/" + comment.id
      else child.idsFather = comment.id
    }    
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */ 
  buildFileTree(obj: {[key: string]: any}, level: number, father: Commentaire): Commentaire[] {
    return Object.keys(obj).reduce<Commentaire[]>((accumulator, key) => {
      const value = obj[key];
      let idsFather = ((father.idsFather != "") ? father.idsFather + "/" : "") + father.id
      let node = new Commentaire(idsFather, value)

      if (value != null) {
        if ((typeof value === 'object') && value.texte != undefined) {
          node.children = this.buildFileTree(value, level + 1, node);
          return accumulator.concat(node);
        } else {
          return accumulator;
        }
      }   
    }, []);
  }
}