import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './pages/admin/dash-board/dash-board.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { StudentDashboardComponent } from './pages/student/student-dashboard/student-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { StudentGuard } from './services/student.guard';

const routes: Routes = [
  {
    path: '',
    component:HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component:DashBoardComponent,
    pathMatch: 'full',
    canActivate: [AdminGuard],//it will be work as security guard
  },                          //for admin, when canActivate is true,then only it will work
                              // canActivate will be true when one is logged in
  {
    path: 'student-dashboard',
    component: StudentDashboardComponent,
    pathMatch: 'full',
    canActivate: [StudentGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
