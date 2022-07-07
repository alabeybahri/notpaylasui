import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {RegisterComponent} from './register/register.component';
import {PageComponent} from './page/page.component';
import {InterceptorService} from "./interceptor.service";
import {AddNoteComponent} from './add-note/add-note.component';
import {AddCategoryComponent} from './add-category/add-category.component';
import {NotesComponent} from './notes/notes.component';
import {CategorySearchPipe} from './category-search.pipe';
import {AddRatingComponent} from './add-rating/add-rating.component';
import {NoteComponent} from './note/note.component';
import {StarRatingModule} from "angular-star-rating";
import { NoteSearchPipe } from './note-search.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import {AuthGuard} from "./auth.guard";
import { LoginPageComponent } from './layouts/login-page/login-page.component';
import { HomePageComponent } from './layouts/home-page/home-page.component';
import {NgxExtendedPdfViewerModule} from "ngx-extended-pdf-viewer";
import { UserComponent } from './user/user.component';
import { ActiveNotePipe } from './active-note.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PageComponent,
    AddNoteComponent,
    AddCategoryComponent,
    NotesComponent,
    CategorySearchPipe,
    AddRatingComponent,
    NoteComponent,
    NoteSearchPipe,
    NavbarComponent,
    LoginPageComponent,
    HomePageComponent,
    UserComponent,
    ActiveNotePipe,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    StarRatingModule.forRoot(),
    NgxExtendedPdfViewerModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
