import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CategorieService } from "../services/categorie.service";
import { FileNode } from "../models/node";

/**
 * File database, it can build a tree structured Json object from string.
 * Each node in Json object represents a file or a directory. For a file, it has filename and type.
 * For a directory, it has filename and children (a list of files or directories).
 * The input will be a json object string, and the output is a list of `FileNode` with nested
 * structure.
 */
@Injectable()
export class FileDatabase {

  dataChange = new BehaviorSubject<FileNode[]>([]);

  get data(): FileNode[] { return this.dataChange.value; }

  constructor(private categorieService: CategorieService) {
    this.categorieService.getCategories().valueChanges()
      .subscribe((rubrics) => {this.initialize(rubrics)})
  }

  initialize(object: any) {
    // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
    //     file node as children.
    let node = new FileNode("", "");
    const data = this.buildFileTree(object, 0, node);

    // Notify the change.
    this.dataChange.next(data);
  }

  sortRubric = function compare(a: FileNode, b: FileNode): number {
    if (a.filename == "Tous")
      return 1
    else if (b.filename == "Tous")
      return -1
    else if (a.filename.toLowerCase() < b.filename.toLowerCase())
        return -1;
    else if (a.filename.toLowerCase() > b.filename.toLowerCase())
        return 1;
    return 0;
  }

  addFather(node: FileNode): void{
    for (let child of node.children){
      if (node.idsFather != undefined) child.idsFather = node.idsFather + "/" + node.filename
      else child.idsFather = node.filename
    }    
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */
  buildFileTree(obj: {[key: string]: any}, level: number, father: FileNode): FileNode[] {
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new FileNode(((father.idsFather != "") ? father.idsFather + "/" : "") + father.filename, key);

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1, node);
        } else {
          node.type = value;
        }
      }     
      return accumulator.concat(node).sort(this.sortRubric);
    }, []);
  }
}