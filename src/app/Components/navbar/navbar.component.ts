import { Component } from '@angular/core';
import { User } from '../../Interface/user';
import { UsersService } from '../../Services/users.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  filteredUser!: User | null; // Change type to single user or null

  constructor(private userService: UsersService, private router: Router) { }

  searchUser(event: Event) {
    let userId = event.target as HTMLInputElement;
    let id = userId.value;

    if (id.trim() === '') {
      this.filteredUser = null; // Reset filteredUser if search field is empty
    }

    this.userService.getUser(+id).subscribe({
      next:(data)=>
        {
          this.filteredUser = data.data;
          console.log(this.filteredUser)
        }
    })
  }

  navigateToUserDetails(userId: number) {
    if (this.filteredUser) {
      this.router.navigate(['/userDetails', userId]);
      this.filteredUser = null; // Reset filteredUser after navigating
    }
  }
}


