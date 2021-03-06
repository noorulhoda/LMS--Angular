import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import{Iuser} from '../../Shared Classes and types/Iuser'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
   constructor(private userservice:UsersService,private route:ActivatedRoute,private router:Router) {}
   user:Iuser;
   id:string='defaultID';
   errMsg='errroor';
   ngOnInit(): void {
   this.route.queryParamMap.subscribe((params: any) => this.id=params.params.id);   
   this.route.params.subscribe(params => {
    console.log(params) //log the entire params object
    this.id=params['id'] //log the value of id
    console.log('id : '+(this.id));
   });

   this.userservice.getUserById(this.id).subscribe(
    
       data => {this.user= data[0]; console.log(this.id);console.log(this.user);},
       er =>this.errMsg=er ,
     );
     console.log(this.user)
   }

   delete(){
    this.userservice.deleteUser(this.id)
    .subscribe(
      data => {
        this.router.navigateByUrl("/home")
      },
      error => {
        console.log("errooorrrrr-_-"+ error)
      }
    );  }
 
}


