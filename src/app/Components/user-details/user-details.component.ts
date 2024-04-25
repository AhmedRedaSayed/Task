import { Component, OnInit } from '@angular/core';
import { User } from '../../Interface/user';
import { UsersService } from '../../Services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit {

  userId!:number | null;
  user!:User | undefined;
  isLoading:boolean = false;
  constructor(private userService:UsersService , private activatedRoute:ActivatedRoute,private router:Router) { }
  ngOnInit(): void {
    //calling the functions on the running instance
    this.getId()
    this.getUser()
  }

  //get userId from the params
  getId()
  {
    this.activatedRoute.paramMap.subscribe((params)=>
    {
      // this because the params.get return string
      let id = params.get('id');
      // this to convert string to number
      this.userId = id ? + id : null;
      this.getUser()
    })
  }
  // get the user from the service
  getUser(){
    this.isLoading = true
    this.userService.getUser(this.userId).subscribe({
      next:(data)=>
        {
          this.user = data.data;
          console.log(this.user)
          this.isLoading = false
        }
    })
  }
  // The button to navigate to userList
  goBack(): void {
    this.router.navigate(['']);
  }

}
