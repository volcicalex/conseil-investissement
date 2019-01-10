import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { NestedTreeControl } from '@angular/cdk/tree';
import { FileNode} from './FileNode';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { FileDatabase } from './FileDatabase';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';

import { map, take, subscribeOn } from 'rxjs/operators';
import { CategorieService } from '../services/categorie.service';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { EditPostComponent } from '../posts/edit-post/edit-post.component';
import { MatDialog } from '@angular/material/dialog';
import { AddPostComponent } from '../posts/add-post/add-post.component';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
  providers: [FileDatabase]
})

export class AccueilComponent implements OnInit{

  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;

  posts: Post[]

  already_clicked: boolean = false;

  nodeSelected: FileNode = new FileNode();

  constructor(database: FileDatabase,
              public dialog: MatDialog,
              private postService: PostService) {
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    database.dataChange.subscribe(data => this.nestedDataSource.data = data);
  }

  hasNestedChild = (_: number, nodeData: FileNode) => !nodeData.type;

  private _getChildren = (node: FileNode) => node.children;

  ngOnInit(){
    this.postService.getPosts().valueChanges()
      .subscribe((posts:Post[]) => {
        this.posts = posts;
      })
  }

  onSelectNode(node: FileNode): void{
    this.nodeSelected = node
  }

  openPost(post: Post): void {
    let dialogRef = this.dialog.open(EditPostComponent, {
      height: '100%',
      width: '80%',
      data: { post: post}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  addPost(): void {
    let dialogRef = this.dialog.open(AddPostComponent, {
      height: '100%',
      width: '80%',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  onLike(post: Post): void {
    if (this.already_clicked) {post.nbLike -= 1; this.already_clicked = false}
    else {post.nbLike += 1; this.already_clicked = true}
    this.postService.likePost(post)
  }

  onDelete(post: Post): void{
    this.postService.deletePost(post.id);
  }
}
