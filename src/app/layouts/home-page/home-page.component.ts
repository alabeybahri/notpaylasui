import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class HomePageComponent  {

  constructor() { }


}
