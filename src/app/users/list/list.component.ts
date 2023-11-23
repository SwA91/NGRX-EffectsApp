import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.mode';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ]
})
export class ListComponent implements OnInit {
  users: UserModel[] = [];

  constructor(
    public usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe((users) => this.users = users);
  }
}
