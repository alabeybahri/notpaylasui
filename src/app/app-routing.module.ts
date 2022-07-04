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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'page', component: PageComponent, canActivate: [AuthGuard] },
  { path: 'addnote', component: AddNoteComponent,canActivate: [AuthGuard] },
  { path: 'addcategory', component: AddCategoryComponent,canActivate: [AuthGuard] },
  { path: 'notes', component: NotesComponent,canActivate: [AuthGuard] },
  { path: 'addrating', component: AddRatingComponent, canActivate: [AuthGuard] },
  { path: 'note/:id', component: NoteComponent , canActivate: [AuthGuard]},
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
