import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { UsersService } from '../../Services/users.service';
import { User } from '../../Interface/user';
import { RouterLink } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [MatPaginator,RouterLink,MatProgressSpinnerModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {

  users!:User[];
  totalUsers: number = 0;
  pageSize: number = 6;
  isLoading:boolean = false

  constructor(private userService:UsersService){}

  // calling the users
  ngOnInit(): void {
    this.getUsers(1)
  }
  getUsers(pageNumber:number)
  {
    this.isLoading = true
    this.userService.getUsers(pageNumber).subscribe({
      next:(data)=>
        {
          console.log(data)
          this.users = data.data
          this.totalUsers = data.total
          this.isLoading = false
        }
    });
  }

  //to change the page number
  currentPageIndex: number = 0;
  onPageChange(event: any): void {
    this.currentPageIndex = event.pageIndex;
    this.getUsers(this.currentPageIndex + 1);
  }
}
