import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { NestedTreeControl } from '@angular/cdk/tree';
import { FileNode } from './FileNode';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { FileDatabase } from './FileDatabase';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';

import { map, take, subscribeOn } from 'rxjs/operators';

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

  constructor(database: FileDatabase,
              private postService: PostService) {
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    database.dataChange.subscribe(data => this.nestedDataSource.data = data);
  }

  hasNestedChild = (_: number, nodeData: FileNode) => !nodeData.type;

  private _getChildren = (node: FileNode) => node.children;

  ngOnInit(){
    this.postService.getPosts().valueChanges()
      .subscribe((posts:Post[]) => this.posts = posts)
  }
}
