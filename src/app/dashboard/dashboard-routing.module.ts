import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadComponent } from '../file-upload/file-upload.component';
import { AuthGuard } from '../auth.guard';


const routes: Routes = [
  { path: 'file', component: FileUploadComponent ,canActivate:[AuthGuard]},
  { path: "", redirectTo: "file" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
