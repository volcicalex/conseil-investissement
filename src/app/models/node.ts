export class FileNode {
    idsFather: string;
    children: FileNode[];
    filename: string;

    constructor(idsFather: string, filename: string){
        this.idsFather = idsFather
        this.children = []
        this.filename = filename
    }
  }