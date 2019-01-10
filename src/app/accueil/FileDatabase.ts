import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { FileNode } from "./FileNode";
import { CategorieService } from "../services/categorie.service";

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
    this.initialize();
  }

  async initialize() {

    let wait = await this.categorieService.getCategories().valueChanges()
      .subscribe((categories: FileNode[]) => {
        this.dataChange.next(categories);
      })
  }
}