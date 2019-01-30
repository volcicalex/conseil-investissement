import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.css']
})
export class ManageUserComponent implements OnInit {

  displayedColumns: string[] = ['nom', 'prenom', 'pseudo', 'email', 'roles', 'supprimer'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private authService: AuthService,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.authService.getUsers().valueChanges()
      .subscribe((users: User[]) => {
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
  }

  applyFilter(filterValue: string) : void {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  displayRoles(user: User) : string {
    let display = "lecteur"
    if (user.roles.author) display += ", auteur"
    if (user.roles.admin) display += ", admin"
    return display
  }

  deleteUser(user: User) {
    return this.authService.deleteUser(user).then(() => this.toastr.success("Utilisateur supprimé"))
  }

}
