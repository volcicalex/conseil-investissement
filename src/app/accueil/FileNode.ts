/**
 * Json node data with nested structure. Each node has a filename and a value or a list of children
 */
export class FileNode {
    children: FileNode[];
    filename: string;
    type: any;
  }
  
  /**
   * The Json tree data in string. The data could be parsed into Json object
   */
export const TREE_DATA = JSON.stringify({
    Applications: {
      Calendar: 'app',
      Chrome: 'app',
      Webstorm: 'app'
    },
    Documents: {
      angular: {
        src: {
          compiler: 'ts',
          core: 'ts'
        }
      },
      material2: {
        src: {
          button: 'ts',
          checkbox: 'ts',
          input: 'ts'
        }
      }
    },
    Downloads: {
      October: 'pdf',
      November: 'pdf',
      Tutorial: 'html'
    },
    Pictures: {
      'Photo Booth Library': {
        Contents: 'dir',
        Pictures: 'dir'
      },
      Sun: 'png',
      Woods: 'jpg'
    }
  });