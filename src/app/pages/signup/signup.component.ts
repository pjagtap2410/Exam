import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  constructor(private userService:UserService, private snack:MatSnackBar) {}

  public user={
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    profile: '',

  };
  ngOnInit(): void{}

  formSubmit() {
   // console.log("Heyy");
    //alert('submit');
    console.log(this.user);
    
    if(this.user.username == '' || this.user.username == null)
    {
     // console.log('caught');
      //alert('User is required !!');
      this.snack.open("Username is required !!",'ok');
      return;
    }
    //adduser: userservice
    this.userService.addUser(this.user).subscribe(
      (data) => {
        //success
        console.log(data);
        alert('success');
      },
      (error) => {
        //error
        console.log(error);
        this.snack.open('Username must be unique','ok');
      }
    );
  }

}
