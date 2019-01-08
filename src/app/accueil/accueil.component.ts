import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';


export interface Section {
  name: string;
}

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})

export class AccueilComponent implements OnInit {

  constructor() { }
  myControl = new FormControl();
  options: string[] = ['nom1', 'nom2', 'nom3'];
  filteredOptions: Observable<string[]>;

  cat1: Section[] = [
    {
      name: 'SousCat1',
    },
    {
      name: 'SousCat2',
    },
    {
      name: 'SousCat3'
    }
  ];
  cat2: Section[] = [
    {
      name: 'SousCat4'
    },
    {
      name: 'SousCat5'
    }
  ];
  displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  
}

export interface PeriodicElement {
  name: string;
  author: string;
  date: Date;
  description: string;
  commentaires: string[];
}

const ELEMENT_DATA: PeriodicElement[] = [
  {author: "auteur 1", name: 'Conseil', date: new Date('1/1/16'), description: 'description blabal', commentaires: ["cool", "top"]},
  {author: "auteur 2", name: 'Conseil 2', date: new Date('3/1/16'), description: 'hello hello', commentaires:[]},
  {author: "auteur 1", name: 'Conseil 3', date: new Date('3/1/16'), description: 'ceci est un conseil', commentaires:["trop nul"]}
];
