import { Routes } from '@angular/router';
import { UsersListComponent } from './Components/users-list/users-list.component';
import { UserDetailsComponent } from './Components/user-details/user-details.component';


export const routes: Routes = [
  {path:'',component:UsersListComponent},
  {path:'userDetails/:id',component:UserDetailsComponent}
];
