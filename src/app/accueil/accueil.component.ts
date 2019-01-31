import { Component, OnInit, Input } from '@angular/core';
import { Rubric} from '../models/rubric';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';
import { EditPostComponent } from '../posts/edit-post/edit-post.component';
import { MatDialog } from '@angular/material/dialog';
import { AddPostComponent } from '../posts/add-post/add-post.component';
import { AddRubricComponent } from '../rubrics/add-rubric/add-rubric.component';
import { CategorieService } from '../services/categorie.service';
import { ToastrService } from 'ngx-toastr';
import { NestedTreeControl } from '@angular/cdk/tree';
import { FileNode } from '../models/node';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { FileDatabase } from './FileDatabase';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
  providers: [FileDatabase]
})

export class AccueilComponent implements OnInit{

  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;

  nodeSelected: FileNode = new FileNode("", "Tous")
  nomRubrique: string

  posts: Post[]
  filteredPosts: Post[]
  searchValue: string = ""

  displayPosts: string = "10"
  sortedValue: string = "date"

  constructor(database: FileDatabase,
              public dialog: MatDialog,
              private toastr: ToastrService,
              public categorieService: CategorieService,
              public postService: PostService) {
    this.nestedTreeControl = new NestedTreeControl<FileNode>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    database.dataChange.subscribe(data => this.nestedDataSource.data = data);
  }

  ngOnInit(){
    this.postService.getPosts().valueChanges()
      .subscribe((posts:Post[]) => {this.posts = posts; this.filteredPosts = this.posts; this.sortedPost()})
  }

  hasNestedChild = (_: number, nodeData: FileNode) => {return nodeData.children && nodeData.children.length > 0;}

  private _getChildren = (node: FileNode) => node.children;

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
    this.initDisplay()
    this.fillByFilter()
  }

  initDisplay(): void{
    this.hideInput()
    this.displayButton()
  }

  hideInput(): void{
    let already_select = document.getElementsByClassName("input_display").item(0)
    if (already_select != undefined) already_select.setAttribute("class", "input")
  }

  hideButton(): void{
    let items = document.getElementsByClassName("button_rubric");
    while (items.length != 0) {
      items.item(0).setAttribute("class", "hidden_button_rubric")
    }
  }

  displayButton(): void{
    let items = document.getElementsByClassName("hidden_button_rubric");
    while (items.length != 0) {
      items.item(0).setAttribute("class", "button_rubric")
    }
  }

  displayAddNode(node: FileNode): void{
    this.hideInput()
    this.hideButton()
    let html_element
    if (node == undefined || node.filename == "Tous"){
      html_element = document.getElementById("input_tous")
    } else {
      html_element = document.getElementById(this.allLink(node))
    }
    html_element.setAttribute("class", "input_display")
  }

  addNode(node: FileNode): void{
    if (this.nomRubrique != undefined && this.nomRubrique.length > 0 && this.nomRubrique.toLowerCase() != "tous"){
      let link = this.nomRubrique
      if (node != undefined && node.filename != "Tous") 
        link = this.allLink(node) + "/" + this.nomRubrique
      this.categorieService.addCategory(link).then(
        () => {
          /* On vide les input */
          this.nomRubrique = ""
          this.hideInput()
          this.toastr.success("Categorie ajouté")
        }
      )
    } else {
      this.toastr.error("Action impossible")
    }
  }

  onDeleteNode(node: FileNode): void {
    this.categorieService.deleteCategory(node.idsFather, node.filename);
  }

  isInNode(post: Post, node: FileNode): boolean{
    if (node.filename == "Tous" || (post.categorie != undefined && this.allLink(node) == post.categorie)) return true
    return false;
  }

  applyFilter(value: string): void{
    this.searchValue = value;
    this.fillByFilter();
  }

  /* Gestion des rubriques */

  isInFilter(post: Post, index: number): boolean{
    return this.isInNode(post, this.nodeSelected) 
      && post.titre.includes(this.searchValue) 
      && (index < parseInt(this.displayPosts))
  }

  /* Gestion des posts */

  fillByFilter(): void{
    this.filteredPosts = []
    for (let i=0; i<this.posts.length; i++){
      if (this.isInFilter(this.posts[i], 0)){
        this.filteredPosts.push(this.posts[i])
      }
    }
    this.sortedPost()
  }

  sortedPost(): void{
    switch(this.sortedValue){
      case "date":
        this.sortedPostsByDate();
        break;
      case "like":
        this.sortedPostsByLike();
        break;
      case "comment":
        this.sortedPostsByComment();
        break;
    }
  }

  sortedPostsByDate(): void{
    let f = function compare(a: Post, b: Post) {
      if (a.date < b.date)
         return 1;
      else if (a.date > b.date)
         return -1;
      return 0;
    };
    this.posts.sort(f);
    this.filteredPosts.sort(f);
  }

  sortedPostsByLike(): void{
    let f = function compare(a: Post, b: Post) {
      if (a.nbLike < b.nbLike)
         return 1;
      else if (a.nbLike > b.nbLike)
         return -1;
      return 0;
    };
    this.posts.sort(f);
    this.filteredPosts.sort(f);
  }

  sortedPostsByComment(): void{
    let f = function compare(a: Post, b: Post) {
      if (a.listComment == undefined)
        return 1
      else if (b.listComment == undefined)
        return -1
      else if (a.listComment.length < b.listComment.length)
         return 1;
      else if (a.listComment.length > b.listComment.length)
         return -1;
      return 0;
    };
    this.posts.sort(f);
    this.filteredPosts.sort(f);
  }

  openPost(post: Post): void {
    this.dialog.open(EditPostComponent, {
      height: '100%',
      width: '80%',
      data: { post: post}
    });
  }

  addPost(): void {
    let dialogRef = this.dialog.open(AddPostComponent, {
      height: '100%',
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.sortedPost()
    });
  }

  onLike(post: Post): void {
    post.nbLike += 1
    this.postService.likePost(post)
  }

  onDelete(post: Post): void{
    this.postService.deletePost(post.id);
  }
}
