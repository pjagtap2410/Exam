import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginData={
    username:'',
    password:'',
  };

constructor(private snack: MatSnackBar, private login:LoginService, private router: Router){

}



  formSubmit(){
    console.log("login clicked");

    if(this.loginData.username.trim()=='' || this.loginData.username==null)
    {
      this.snack.open('Username is required !! ', 'ok',{
        duration:3000,
      });
      return;
    }  
    if(this.loginData.password.trim()=='' || this.loginData.password==null)
    {
      this.snack.open('password is required !! ', 'ok',{
        duration:3000,
      });
      return;
    }  

    // request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data: any)=>{
        console.log("success");
        console.log(data);

        this.login.loginUser(data.token);

        this.login.getCurrentUser().subscribe(
          (user:any)=>{
          this.login.setUser(user);
          console.log(user);
          // redirect ...ADMIN: admin-dashboard
          // redirect ...STUDENT: nstudent-dashboard

          if(this.login.getUserRole()=="ADMIN")
          {
            //admin dashboard
             //  window.location.href = '/admin';
             this.router.navigate(['admin']);
             this.login.loginStatusSubject.next(true);

          }
          else if(this.login.getUserRole()=="STUDENT")
          {
            //student dashboard
            //window.location.href='/student-dashboard';
            this.router.navigate(['student-dashboard'])
            this.login.loginStatusSubject.next(true);
          }
          else
          {
            this.login.logout();
          }

          }
        );

      },
      (error)=>{
        console.log('Error !');
        console.log(error);
        this.snack.open('Invalid details!! Try again','ok',{
          duration: 3000,
        });
      }
    );
  }


}
