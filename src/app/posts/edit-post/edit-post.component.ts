import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Commentaire } from 'src/app/models/commentaire';
import { AuthService } from 'src/app/services/auth.service';
import { CommentaireService } from 'src/app/services/commentaire.service';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { CommentDatabase } from './CommentDatabse';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
  providers: [CommentDatabase]
})
export class EditPostComponent{

  newComment: string;
  commentaire: Commentaire;

  nestedTreeControl: NestedTreeControl<Commentaire>;
  nestedDataSource: MatTreeNestedDataSource<Commentaire>;

  constructor(database: CommentDatabase,
              private toastr: ToastrService,
              public dialogRef: MatDialogRef<EditPostComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public dialog: MatDialog,
              private auth: AuthService,
              private commentService: CommentaireService) {

    this.nestedTreeControl = new NestedTreeControl<Commentaire>(this._getChildren);
    this.nestedDataSource = new MatTreeNestedDataSource();

    if (data.post.listComment) {
      database.initialize(data.post.listComment);
      database.dataChange.subscribe(data => this.nestedDataSource.data = data);
    }
  }

  hasNestedChild = (_: number, nodeData: Commentaire) => {return nodeData.children && nodeData.children.length > 0};

  private _getChildren = (node: Commentaire) => node.children;

  indent(comment: Commentaire){
    let indent = ""
    let split = comment.idsFather.split("/")
    for (let id of split) if(id != "") indent += "--------"
    return indent
  }

  allLink(comment: Commentaire): string{
    let link = ""
    if (comment.idsFather.length > 0) link += comment.idsFather + "/"
    link += comment.id
    return link 
  }

  hideInput(): void{
    let already_select = document.getElementsByClassName("input_comment_display").item(0)
    if (already_select != undefined) already_select.setAttribute("class", "input_comment")
  }

  hideButton(): void{
    let items = document.getElementsByClassName("button_comment");
    while (items.length != 0) {
      items.item(0).setAttribute("class", "hidden_button_comment")
    }
  }

  displayButton(): void{
    let items = document.getElementsByClassName("hidden_button_comment");
    while (items.length != 0) {
      items.item(0).setAttribute("class", "button_comment")
    }
  }

  displayAddComment(comment: Commentaire): void{
    this.hideInput()
    this.hideButton()
    let html_element
    if (comment == undefined){
      html_element = document.getElementById("input_comment_tous")
    } else {
      html_element = document.getElementById(this.allLink(comment))
    }
    html_element.setAttribute("class", "input_comment_display")
  }

  addComment(comment: Commentaire): void{
    let auteur
    if (this.newComment != undefined && this.newComment.length > 0){
      this.auth.user.map(user => {
        auteur = user
      }).subscribe( () => {
        let obj = {id : Math.random().toString(36).substr(2, 9), idsFather: "", 
          auteur: "auteur", date: new Date(), texte: this.newComment, nbLike: 0}
        let commentaire = (comment == undefined) ? 
          new Commentaire("listComment", obj) : new Commentaire(this.allLink(comment), obj)  
        this.commentService.editComment(this.data.post.id, commentaire).then(
          () => {
            /* On vide les input */
            this.newComment = ""
            this.hideInput()
            this.toastr.success("Commentaire ajouté")
          })
      })
    } else {
      this.toastr.error("Action impossible")
    }
  }

  onDeleteComment(comment: Commentaire): void {
    this.commentService.deleteComment(this.data.post.id, this.allLink(comment))
      .then(() => {this.toastr.success("Commentaire supprimé")})
  }

  onLike(comment: Commentaire): void {
    comment.nbLike += 1
    this.commentService.editComment(this.data.post.id, comment);
  }
}
