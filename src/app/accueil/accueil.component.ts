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

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css'],
  providers: []
})

export class AccueilComponent implements OnInit{

  /*nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;*/

  posts: Post[]
  searchValue: string = ""

  displayPosts: string = "10";

  rubrics: Rubric[]
  rubricSelected: Rubric = new Rubric("Tous")

  constructor(public dialog: MatDialog,
              private toastr: ToastrService,
              private categorieService: CategorieService,
              private postService: PostService) {
  }

  ngOnInit(){
    this.categorieService.getCategories().valueChanges()
      .subscribe((rubrics: Rubric[]) => {this.rubrics = rubrics; this.sortedRubrics()})

    this.postService.getPosts().valueChanges()
      .subscribe((posts:Post[]) => {this.posts = posts; this.sortedPosts()})
  }

  applyFilter(value: string): void{
    this.searchValue = value;
  }

  /* Gestion des rubriques */

  sortedRubrics(): void{
    let f = function compare(a: Rubric, b: Rubric) {
      if (a.nom == "Tous") return 1
      else if (b.nom == "Tous") return -1  
      else if (a.nom < b.nom)
         return -1;
      else if (a.nom > b.nom)
         return 1;
      return 0;
    };
    this.rubrics.sort(f);
  }

  isInFilter(post: Post, index: number): boolean{
    return (this.rubricSelected.nom == "Tous" || ((post.categorie != undefined) && (post.categorie.id == this.rubricSelected.id))) 
      && post.titre.includes(this.searchValue) && index < parseInt(this.displayPosts)
  }

  onSelectRubric(node: Rubric): void{
    this.rubricSelected = node
  }

  addRubric(): void{
    let dialogRef = this.dialog.open(AddRubricComponent, {
      height: '200px',
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.sortedRubrics()
    });
  }

  onDeleteRubric(rubric: Rubric): void{
    this.categorieService.deleteCategory(rubric.id).then(() => this.toastr.success("Rubrique supprimée"))
  }

  /* Gestion des posts */

  sortedPosts(): void{
    let f = function compare(a: Post, b: Post) {
      if (a.date < b.date)
         return 1;
      else if (a.date > b.date)
         return -1;
      return 0;
    };
    this.posts.sort(f);
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
      this.sortedPosts()
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
