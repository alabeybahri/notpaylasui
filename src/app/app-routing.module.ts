import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {RegisterComponent} from "./register/register.component";
import {PageComponent} from "./page/page.component";
import {AddNoteComponent} from "./add-note/add-note.component";
import {AddCategoryComponent} from "./add-category/add-category.component";
import {NotesComponent} from "./notes/notes.component";
import {AddRatingComponent} from "./add-rating/add-rating.component";
import {NoteComponent} from "./note/note.component";
import {AuthGuard} from "./auth.guard";
import {LoginPageComponent} from "./layouts/login-page/login-page.component";
import {HomePageComponent} from "./layouts/home-page/home-page.component";

const routes: Routes = [
  {path: '', component: LoginPageComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent},
      { path: '', component: LoginComponent},
    ]}, {
    path: '', component: HomePageComponent,
    children: [
      { path: 'page', component: PageComponent, canActivate: [AuthGuard] },
      { path: 'addnote', component: AddNoteComponent,canActivate: [AuthGuard] },
      { path: 'addcategory', component: AddCategoryComponent,canActivate: [AuthGuard] },
      { path: 'notes', component: NotesComponent,canActivate: [AuthGuard] },
      { path: 'addrating', component: AddRatingComponent, canActivate: [AuthGuard] },
      { path: 'note/:id', component: NoteComponent , canActivate: [AuthGuard]},
      ]}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
