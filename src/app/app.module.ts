import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { RegisterComponent } from './register/register.component';
import { PageComponent } from './page/page.component';
import {InterceptorService} from "./interceptor.service";
import { AddNoteComponent } from './add-note/add-note.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { NotesComponent } from './notes/notes.component';
import { CategorySearchPipe } from './category-search.pipe';


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
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
