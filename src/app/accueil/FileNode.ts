/**
 * Json node data with nested structure. Each node has a filename and a value or a list of children
 */
export class FileNode {
    id: string;
    children: FileNode[];
    filename: string;
    type: any;
  }