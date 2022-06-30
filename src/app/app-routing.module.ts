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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'page', component: PageComponent },
  { path: 'addnote', component: AddNoteComponent },
  { path: 'addcategory', component: AddCategoryComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'addrating', component: AddRatingComponent },
  { path: 'note/:id', component: NoteComponent },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
