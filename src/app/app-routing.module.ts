import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {RegisterComponent} from "./register/register.component";
import {PageComponent} from "./page/page.component";
import {AddNoteComponent} from "./add-note/add-note.component";
import {AddCategoryComponent} from "./add-category/add-category.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'page', component: PageComponent },
  { path: 'addnote', component: AddNoteComponent },
  { path: 'addcategory', component: AddCategoryComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
