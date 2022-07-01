import { Pipe, PipeTransform } from '@angular/core';
import {DTOCategory} from "../models/DTOCategory";

@Pipe({
  name: 'categorySearch'
})
export class CategorySearchPipe implements PipeTransform {

  transform(value: DTOCategory[], args:string): any[] {
   if (!args) {
     return value;
   } else {
     return value.filter(c => c.name.toLowerCase().includes(args.toLowerCase()));
   }
  }

}
