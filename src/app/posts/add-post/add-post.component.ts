import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post';
import { FormGroup, FormControl } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { auth } from 'firebase';
import { CategorieService } from 'src/app/services/categorie.service';
import { Rubric } from 'src/app/models/rubric';
import { FileDatabase } from 'src/app/accueil/FileDatabase';
import { NestedTreeControl } from '@angular/cdk/tree';
import { FileNode } from 'src/app/models/node';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
  providers: [FileDatabase]
})
export class AddPostComponent {

  post: Post

  nestedTreeControl: NestedTreeControl<FileNode>
  nestedDataSource: MatTreeNestedDataSource<FileNode>

  nodeSelected: FileNode = new FileNode("", "")

  postForm = new FormGroup({
    titre: new FormControl(''),
    resume: new FormControl(''),
    description: new FormControl('')
  });

  constructor(database: FileDatabase,
              public dialogRef: MatDialogRef<AddPostComponent>,
              private postService: PostService,
              private categorieService: CategorieService,
              private auth: AuthService) { 
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    database.dataChange.subscribe(data => this.nestedDataSource.data = data);
  }

  indent(node: FileNode){
    let indent = ""
    let split = node.idsFather.split("/")
    for (let id of split) if(id != "") indent += "--------"
    return indent
  }

  allLink(node: FileNode): string{
    let link = ""
    if (node.idsFather.length > 0) link += node.idsFather + "/"
    link += node.filename
    return link 
  }

  onSelectNode(node: FileNode): void{
    this.nodeSelected = node
  }

  hasNestedChild = (_: number, nodeData: FileNode) => {return nodeData.children && nodeData.children.length > 0;}

  private _getChildren = (node: FileNode) => node.children;

  addPost(): void{
    let auteur
    this.auth.user.map(user => {
      auteur = user
    }).subscribe( () => {
      this.post = new Post(this.postForm.value.titre, this.postForm.value.description, auteur,this.postForm.value.resume, this.allLink(this.nodeSelected))
      this.postService.editPost(this.post).then( () => this.dialogRef.close(true))
    })
  }
}
