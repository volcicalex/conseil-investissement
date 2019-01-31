import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, Injectable} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {BehaviorSubject} from 'rxjs';
import { CategorieService } from 'src/app/services/categorie.service';
import { Post } from 'src/app/models/post';
import { ToastrService } from 'ngx-toastr';
import { FileNode } from 'src/app/models/node';
import { FileDatabase } from 'src/app/accueil/FileDatabase';

/**
 * @title Tree with nested nodes
 */
@Component({
  selector: 'tree.component',
  templateUrl: 'tree.component.html',
  styleUrls: ['tree.component.css'],
  providers: [FileDatabase]
})
export class TreeComponent {
  nestedTreeControl: NestedTreeControl<FileNode>;
  nestedDataSource: MatTreeNestedDataSource<FileNode>;

  nodeSelected: FileNode
  nomRubrique: string

  constructor(database: FileDatabase,
              public categorieService: CategorieService,
              private toastr: ToastrService) {
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

  hasNestedChild = (_: number, nodeData: FileNode) => {return nodeData.children && nodeData.children.length > 0;}

  private _getChildren = (node: FileNode) => node.children;

  onSelectNode(node: FileNode): void{
    this.nodeSelected = node;
  }

  hideInput(): void{
    let already_select = document.getElementsByClassName("input_display").item(0)
    if (already_select != undefined) already_select.setAttribute("class", "input")
  }

  displayAddNode(node: FileNode): void{
    this.hideInput()
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
        }
      )
    } else {
      this.toastr.error("Action impossible")
    }
  }

  onDeleteNode(node: FileNode): void {
    this.categorieService.deleteCategory(node.idsFather, node.filename);
  }
}
